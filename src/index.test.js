// @flow

import shib from "./index";
import passport from "passport";
import { Strategy as mockStrategy } from "passport-saml";

jest.mock("passport-saml");

function makeMockStrategy(user = {}, cb = (x, d) => d(x)) {
  class MockStrategy extends passport.Strategy {}
  MockStrategy.prototype.name = "saml";
  MockStrategy.prototype.authenticate = function() {
    cb(user, (err, profile) => this.success(profile));
  };
  MockStrategy.prototype.generateServiceProviderMetadata = () => {};
  return new MockStrategy();
}

function mockUser(user = {}) {
  mockStrategy.mockImplementation((config, cb) => {
    return makeMockStrategy(user, cb);
  });
}

it("throws an error if private key does not exist", () => {
  expect(() =>
    shib(passport, {
      host: "localhost",
      privateKeyPath: "./privatekey.key"
    })
  ).toThrow();
});

it("configures SAML strategy with defaults and provided options", () => {
  mockUser({});
  shib(passport, { host: "https://local.host:8443" });
  expect(mockStrategy).toHaveBeenCalledWith(
    expect.objectContaining({
      callbackUrl: "https://local.host:8443/login/callback",
      issuer: "https://local.host/shibboleth-sp",
      decryptionPvk: null,
      acceptedClockSkewMs: 180000
    }),
    expect.anything()
  );
});

it("maps default and provided attributes to friendly names and drops others", () => {
  mockUser({
    "urn:oid:1.3.6.1.4.1.6537.1.19": "1234-abcd",
    "urn:oid:2.16.840.1.113730.3.1.241": "Josiah Carberry",
    "urn:oid:2.5.4.42": "Josiah",
    "urn:oid:2.5.4.4": "Carberry",
    "urn:oid:1.3.6.1.4.1.6537.1.15": "jcarberr",
    "urn:oid:1.3.6.1.4.1.6537.1.14": "josiah_carberry",
    "urn:oid:1.3.6.1.4.1.5923.1.1.1.6": "jcarberr@brown.edu",
    "urn:oid:1.3.6.1.4.1.6537.1.13": "123456789",
    "urn:oid:1.3.6.1.4.1.6537.1.16": "B12345678",
    "urn:oid:1.3.6.1.4.1.6537.1.68": "100000000",
    "urn:oid:2.5.4.12": "Professor",
    "urn:oid:2.5.4.11": "Psychoceramics",
    "urn:oid:1.3.6.1.4.1.6537.1.28": "staff",
    "urn:oid:1.3.6.1.4.1.5923.1.1.1.5": "staff",
    "urn:oid:1.3.6.1.4.1.5923.1.1.1.1": ["staff", "alum"],
    "urn:oid:1.3.6.1.4.1.6537.1.25": "active",
    "urn:oid:1.3.6.1.4.1.5923.1.5.1.1": ["undergrad", "first-year"],
    "custom-attribute-1": "Stinkney",
    "custom-attribute-2": "shouldBeDropped"
  });
  shib(passport, {
    host: "https://local.host",
    attributeMap: {
      "custom-attribute-1": "middleName"
    }
  });
  const req = { logIn: jest.fn() };
  passport.authenticate("saml")(req, { end: () => {} });
  expect(req.logIn.mock.calls[0][0]).toEqual({
    uuid: "1234-abcd",
    displayName: "Josiah Carberry",
    firstName: "Josiah",
    lastName: "Carberry",
    authId: "jcarberr",
    netId: "josiah_carberry",
    eppn: "jcarberr@brown.edu",
    brownId: "123456789",
    bannerId: "B12345678",
    advanceId: "100000000",
    title: "Professor",
    department: "Psychoceramics",
    brownType: "staff",
    primaryAffiliation: "staff",
    affiliations: ["staff", "alum"],
    status: "active",
    isMemberOf: ["undergrad", "first-year"],
    middleName: "Stinkney"
  });
});

it("configures passport to use the configured strategy", () => {
  const mockStrat = makeMockStrategy();
  mockStrategy.mockImplementation(() => mockStrat);
  jest.spyOn(passport, "use");
  shib(passport, { host: "localhost" });
  expect(passport.use).toHaveBeenCalledTimes(1);
  expect(passport.use.mock.calls[0][0]).toBe(mockStrat);
});

it("configures passport with noop serializer", () => {
  jest.spyOn(passport, "serializeUser");
  shib(passport, { host: "localhost" });
  expect(passport.serializeUser).toHaveBeenCalledTimes(1);
  const user = { test: "TEST" };
  passport.serializeUser(user, (err, serializedUser) => {
    expect(serializedUser).toBe(user);
  });
});

it("configures passport with noop deserializer", () => {
  jest.spyOn(passport, "deserializeUser");
  shib(passport, { host: "localhost" });
  expect(passport.deserializeUser).toHaveBeenCalledTimes(1);
  const user = { test: "TEST" };
  passport.deserializeUser(user, (err, deserializedUser) => {
    expect(deserializedUser).toBe(user);
  });
});

describe("default logout middleware", () => {
  it("kills the local session", () => {
    shib(passport, { host: "localhost" });
    const req = { logout: jest.fn() };
    passport.logout()(req, { redirect: () => {} });
    expect(req.logout).toHaveBeenCalledTimes(1);
  });

  it("redirects to kill the IdP session before returning to the app", () => {
    shib(passport, { host: "localhost" });
    const res = { redirect: jest.fn() };
    passport.logout({ successRedirect: "https://localhost" })(
      { logout: () => {} },
      res
    );
    expect(res.redirect).toHaveBeenCalledTimes(1);
    expect(res.redirect).toHaveBeenCalledWith(
      "https://sso.brown.edu/idp/shib_logout.jsp?return=https%3A%2F%2Flocalhost%2F"
    );
  });
});
