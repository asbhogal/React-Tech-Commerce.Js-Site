const webpack = require("webpack");

const   path = require("path"),
        Dotenv = require("dotenv-webpack"),
        MiniCSSExtractPlugin = require("mini-css-extract-plugin"),
        HTMLWebpackPlugin = require("html-webpack-plugin"),
        { CleanWebpackPlugin } = require("clean-webpack-plugin"),
        ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin"),
        //ProvidePlugin = require("process"),
        plugins = [
            new webpack.ProvidePlugin({
                process: 'process/browser',
         }),
            new Dotenv(),
           // new ProvidePlugin(),
            new CleanWebpackPlugin(),
            new MiniCSSExtractPlugin(),
            new HTMLWebpackPlugin({
                title: "React Technology Commerce Site",
                author: "Aman Singh Bhogal & JavaScript Mastery",
                template: "./src/index.html"
            }),
        ];

let     mode = "development";

process.env.NODE_ENV === "production" ? mode = "production" : plugins.push(new ReactRefreshWebpackPlugin());

module.exports = {
    mode: mode,

    entry: {
        main: './src/js/index.js',
    },

    output: {
        path: path.resolve(__dirname, "dist"),
        assetModuleFilename: "images/[hash][ext][query]"
    },

    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: "asset"
            },
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [
                    MiniCSSExtractPlugin.loader, 
                    "css-loader", 
                    "postcss-loader",
                    "sass-loader"
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
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                type: "asset/resource",
            },
        ],
    },

    plugins: plugins,

    resolve: {
        extensions: [".js", ".jsx"],
    },

    devtool: "source-map",
    devServer: {
        static: "./dist",
        hot: true
    },
};