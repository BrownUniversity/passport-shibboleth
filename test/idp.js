// @flow

import express from "express";
import http from "http";
import samlp from "samlp";

type Config = {|
  port: number,
  issuer: string,
  acsUrl: string,
  cert: string,
  key: string,
  user?: {}
|};

export default function getIdP(config: Config) {
  const app = express();
  let lastResponse;
  app.get("/saml/sso", function(req, res, next) {
    req.user = config.user;
    samlp.auth({
      getPostURL: function(_, __, ___, callback) {
        callback(null, config.acsUrl);
      },
      responseHandler: function(response, _, __, res) {
        lastResponse = response;
        res.sendStatus(200);
      },
      ...config
    })(req, res, next);
  });
  const server = http.createServer(app);

  return {
    start() {
      server.listen(config.port);
    },
    stop() {
      server.close();
    },
    getResponse() {
      const resp = lastResponse;
      lastResponse = null;
      return resp;
    }
  };
}
