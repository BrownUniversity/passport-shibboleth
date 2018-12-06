// @flow

import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import http from "http";
import brownShib, { type Options } from "../src/index";

type Config = {|
  port: number,
  shibConfig: Options
|};

export default function getApp(config: Config) {
  const app = express();
  const shib = brownShib(config.shibConfig);
  app.use(bodyParser.json());
  app.use(
    session({
      secret: "this should be a secret",
      resave: false,
      saveUninitialized: true
    })
  );
  app.use(shib.passport.initialize());
  app.use(shib.passport.session());
  app.get("/login", shib.authenticate());
  app.post(
    "/login/callback",
    shib.authenticate({
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
