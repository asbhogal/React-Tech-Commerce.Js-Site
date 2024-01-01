const webpack = require("webpack");

const path = require("path"),
  Dotenv = require("dotenv-webpack"),
  MiniCSSExtractPlugin = require("mini-css-extract-plugin"),
  HTMLWebpackPlugin = require("html-webpack-plugin"),
  { CleanWebpackPlugin } = require("clean-webpack-plugin"),
  ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin"),
  //ProvidePlugin = require("process"),
  plugins = [
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
    new webpack.DefinePlugin({
      "process.env.REACT_APP_CHEC_PUBLIC_KEY": JSON.stringify(
        process.env.REACT_APP_CHEC_PUBLIC_KEY
      ),
      "process.env.REACT_APP_STRIPE_PUBLIC_KEY": JSON.stringify(
        process.env.REACT_APP_STRIPE_PUBLIC_KEY
      ),
    }),
    new Dotenv(),
    // new ProvidePlugin(),
    new CleanWebpackPlugin(),
    new MiniCSSExtractPlugin(),
    new HTMLWebpackPlugin({
      title: "React Technology Commerce Site",
      author: "Aman Singh Bhogal & JavaScript Mastery",
      favicon: "./src/assets/logos/Soeb-USB-symbol.svg",
      template: "./src/index.html",
    }),
  ];

let mode = "development";

process.env.NODE_ENV === "production"
  ? (mode = "production")
  : plugins.push(new ReactRefreshWebpackPlugin());

module.exports = {
  mode: mode,

  entry: {
    main: "./src/index.tsx",
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "images/[hash][ext][query]",
    publicPath: "/",
  },

  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset",
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          MiniCSSExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "ts-loader",
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        type: "asset/resource",
      },
    ],
  },

  plugins: plugins,

  resolve: {
    extensions: [".js", ".jsx", ".tsx", ".ts"],
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
  },

  devtool: "source-map",
  devServer: {
    static: "./dist",
    hot: true,
    historyApiFallback: true,
  },
};
