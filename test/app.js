// @flow

import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import http from "http";
import passport from "passport";
import Strategy, { type Options } from "../src/index";

type Config = {|
  port: number,
  shibConfig: Options
|};

export default function getApp(config: Config) {
  const app = express();
  passport.use(new Strategy(config.shibConfig));
  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
  app.use(bodyParser.json());
  app.use(
    session({
      secret: "this should be a secret",
      resave: false,
      saveUninitialized: true
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.get("/login", passport.authenticate("saml"));
  app.post(
    "/login/callback",
    passport.authenticate("saml", {
      successRedirect: "/profile"
    })
  );
  app.get("/profile", function(req, res) {
    if (req.isAuthenticated()) {
      res.json(req.user);
    } else {
      res.redirect("/login");
    }
  });

  const server = http.createServer(app);
  return {
    start: () => {
      server.listen(config.port);
    },
    stop: () => {
      server.close();
    }
  };
}
