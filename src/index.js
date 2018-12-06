// @flow

import fs from "fs";
import url from "url";
import passport from "passport";
import { Strategy as samlStrategy } from "passport-saml";
import config, { type Config } from "./config";

export type Options = {|
  ...$Exact<Config>,
  attributeMap?: { [string]: string }
|};

export default function(options: Options) {
  if (
    typeof options.privateKeyPath === "string" &&
    !fs.existsSync(options.privateKeyPath)
  ) {
    throw new Error(
      "Private key file does not exist: " + options.privateKeyPath
    );
  }

  // Merge attributeMap with defaults
  const { attributeMap, ...conf } = options;
  const attrMap = {
    "urn:oid:1.3.6.1.4.1.6537.1.19": "uuid",
    "urn:oid:2.16.840.1.113730.3.1.241": "displayName",
    "urn:oid:2.5.4.42": "firstName",
    "urn:oid:2.5.4.4": "lastName",
    "urn:oid:1.3.6.1.4.1.6537.1.15": "authId",
    "urn:oid:1.3.6.1.4.1.6537.1.14": "netId",
    "urn:oid:1.3.6.1.4.1.5923.1.1.1.6": "eppn",
    "urn:oid:1.3.6.1.4.1.6537.1.13": "brownId",
    "urn:oid:1.3.6.1.4.1.6537.1.16": "bannerId",
    "urn:oid:1.3.6.1.4.1.6537.1.68": "advanceId",
    "urn:oid:2.5.4.12": "title",
    "urn:oid:2.5.4.11": "department",
    "urn:oid:1.3.6.1.4.1.6537.1.28": "brownType",
    "urn:oid:1.3.6.1.4.1.5923.1.1.1.5": "primaryAffiliation",
    "urn:oid:1.3.6.1.4.1.5923.1.1.1.1": "affiliations",
    "urn:oid:1.3.6.1.4.1.6537.1.25": "status",
    "urn:oid:1.3.6.1.4.1.5923.1.5.1.1": "isMemberOf",
    ...(attributeMap || {})
  };

  // Basically no-ops
  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  // Handles mapping attributes
  const strategy = new samlStrategy(config(conf), function(profile, done) {
    const prof = {};

    for (const a in attrMap) {
      if (a in profile) {
        prof[attrMap[a]] = profile[a];
      }
    }

    return done(null, prof);
  });
  passport.use(strategy);

  passport.logout = function(logoutOptions) {
    logoutOptions = logoutOptions || {};

    return function(req, res) {
      const parsed = url.parse(logoutOptions.successRedirect || "/");
      const protocol = parsed.protocol || "https";
      const path = parsed.path || "/";
      const host = parsed.host ? protocol + "//" + parsed.host : options.host;
      const redirect = host + path;

      // Kill local session
      req.logout();

      // Redirect to IdP to kill its session and provide it with a return url
      return res.redirect(
        "https://sso.brown.edu/idp/shib_logout.jsp?return=" +
          encodeURIComponent(redirect)
      );
    };
  };

  return {
    passport: passport,
    strategy: "saml",
    generateServiceProviderMetadata: strategy.generateServiceProviderMetadata.bind(
      strategy
    ),
    authenticate: passport.authenticate.bind(passport, "saml"),
    logout: passport.logout.bind(passport)
  };
}
