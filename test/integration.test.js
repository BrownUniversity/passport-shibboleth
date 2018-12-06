// @flow

import nodeFetch from "node-fetch";
import fetchCookie from "fetch-cookie";
import selfsigned from "selfsigned";
import getApp from "./app";
import getIdP from "./idp";

const fetch = fetchCookie(nodeFetch);

function createServers(user = {}) {
  const pems = selfsigned.generate();
  const app = getApp({
    port: 3000,
    shibConfig: {
      host: "http://localhost:3000",
      cbPath: "/login/callback",
      issuer: "http://localhost:3000/sp",
      entryPoint: "http://localhost:3001/saml/sso",
      cert: pems.cert,
      attributeMap: {
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress":
          "email",
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name":
          "displayName",
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname":
          "firstName",
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname":
          "lastName"
      }
    }
  });
  const idp = getIdP({
    port: 3001,
    acsUrl: "http://localhost:3000/login/callback",
    issuer: "http://localhost:3000/sp",
    cert: pems.cert,
    key: pems.private,
    user
  });
  return { app, idp };
}

it("redirects to idp for protected routes", async () => {
  const { app } = createServers();
  app.start();
  const res = await fetch("http://localhost:3000/login", {
    redirect: "manual"
  });
  const headers = res.headers.raw();
  expect(headers.location[0]).toMatch("http://localhost:3001/saml/sso");
  app.stop();
});

it("handles assertions from idp", async () => {
  const { app, idp } = createServers({
    id: 1,
    displayName: "Josiah Carberry",
    name: {
      givenName: "Josiah",
      familyName: "Carberry"
    },
    emails: [{ value: "josiah_carberry@brown.edu" }]
  });
  app.start();
  idp.start();
  // Get cookie to reuse later
  await fetch("http://localhost:3000/profile", {
    redirect: "manual"
  });
  await fetch("http://localhost:3000/profile");
  let samlResponse = idp.getResponse();
  if (samlResponse) {
    samlResponse = samlResponse.toString("base64");
  } else {
    expect(false).toBe(true);
  }
  const body = JSON.stringify({ SAMLResponse: samlResponse });
  const res = await fetch("http://localhost:3000/login/callback", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": body.length
    },
    body
  });
  const user = await res.json();
  expect(user).toEqual({
    email: "josiah_carberry@brown.edu",
    firstName: "Josiah",
    lastName: "Carberry",
    displayName: "Josiah Carberry"
  });
  app.stop();
  idp.stop();
});
