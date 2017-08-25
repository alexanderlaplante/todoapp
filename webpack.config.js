const webpack = require("webpack");
const path = require("path");
const pkg = require("./package.json");

module.exports = {
  target: "node", // You don't need the 'target' field in, say, an Angular config
  entry: path.resolve(__dirname, pkg.main), //
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "server.js"
  },
  resolve: {
    // resolve: allows you to use imports without the file extensions
    extensions: [".ts", ".js", ".json"]
  },
  module: {
    // The workhorse of webpack - defines the build steps
    // We don't need to import the loaders (e.g. ts-loader) - webpack does that internally
    rules: [
      {
        // Regex matching the file extensions we want to pipe through this loader
        test: /\.ts$/,
        use: ["ts-loader"],
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        use: ["babel-loader"],
        exclude: /node_modules/
      },
      { test: /\.json$/, use: "json-loader" }
    ]
  }
};
