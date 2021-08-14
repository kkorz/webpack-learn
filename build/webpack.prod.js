const { merge } = require("webpack-merge");
const webpackBaseConfig = require("./webpack.config.js");

module.exports = merge(webpackBaseConfig, {
  mode: "production",
  devtool: "hidden-source-map",
  cache: {
    type: "filesystem",
    buildDependencies: {
      config: [__filename],
    },
  },
});
