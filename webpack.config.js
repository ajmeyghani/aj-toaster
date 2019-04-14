const path = require("path");
const CleanWebpackPlugin = require('clean-webpack-plugin');
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
  },
  output: {
    path: path.resolve("build"),
    filename: "[name].js",
    libraryTarget: 'umd',
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
          'style-loader',
          'css-loader'
        ]
      }
    ],
  },
  externals: {
    "react": "React",
    "react-dom": "ReactDOM",
  },
  plugins: [
    new CleanWebpackPlugin(),
  ]
};
