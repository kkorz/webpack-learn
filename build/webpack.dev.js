const { merge } = require("webpack-merge");
const webpackBaseConfig = require("./webpack.config.js");

module.exports = merge(webpackBaseConfig, {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  cache: {
    type: "memory", // dev添加缓存
  },
  devServer: {
    port: 8888,
    hot: true,
    open: true,
    compress: true, // 是否开启gzip压缩
    stats: "errors-only", // 终端仅打印 error
    proxy: {
      "/api": {
        target: "localhost:8888",
        changeOrigin: true,
        pathRewrite: {
          "/api": "",
        },
      },
    },
  },
});
