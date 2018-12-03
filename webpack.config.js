const path = require("path");

module.exports = {
  mode: "none",
  entry: "./src/index.js",
  target: "node",
  node: {
    __dirname: false
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "umd"
  },
  externals: {
    passport: "passport",
    "passport-saml": "passport-saml"
  }
};
