const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const IS_PROD = process.env.NODE_ENV === "production";

module.exports = {
  mode: IS_PROD ? "production" : "development",
  devtool: "source-map",
  resolve: {
    extensions: ["*", ".js", ".jsx", ".json"],
    modules: [
      path.resolve("./src"),
      path.resolve("./node_modules"),
    ],
  },
  entry: {
    toaster: path.resolve("src/toaster/toaster"),
    "docs/index.js": path.resolve("gh-pages/index.js"),
  },
  output: {
    path: path.resolve("build"),
    filename: "[name].js",
    libraryTarget: "umd",
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
        ],
      },
    ],
  },
  externals: {
    "react": "React",
    "react-dom": "ReactDOM",
    "react-router-dom": "ReactRouterDOM",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      chunks: ["docs/index.js"],
      template: path.resolve(`gh-pages/${IS_PROD ? "index.prod.html" : "index.html"}`),
      hash: true,
    }),
  ],
};
