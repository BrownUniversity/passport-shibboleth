module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current"
        }
      }
    ],
    ["@babel/preset-flow"]
  ],
  plugins: ["@babel/plugin-proposal-object-rest-spread"]
};
