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
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },
  externals: {
    "passport-saml": "passport-saml"
  }
};
