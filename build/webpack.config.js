const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssPlugin = require("optimize-css-assets-webpack-plugin"); // 压缩打包后的css

const rootDir = process.cwd();

module.exports = {
  mode: "none",
  entry: path.resolve(rootDir, "src/index.js"),
  output: {
    filename: "[name].[contenthash:4].js",
    path: path.resolve(rootDir, "dist"),
    clean: true,
  },
  resolve: {
    extensions: [".jsx", ".js", ".json"],
    alias: {
      "@": path.resolve(rootDir, "src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.resolve(rootDir, "src"),
        exclude: /node_modules/,
        use: ["thread-loader", "babel-loader", "eslint-loader"],
      },
      {
        test: /\.(css|less)$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          "thread-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                compileType: "module",
                localIdentName: "[local]__[hash:base64:5]",
              },
            },
          },
          "less-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["autoprefixer"],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(rootDir, "public/index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
    new OptimizeCssPlugin(),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
      filename: "js/[name].[hash].js",
    },
  },
};
