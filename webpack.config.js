/**
 * webpack.config.js
 * Author: Barbara Goss
 * Created: 2017-01-26
 */

module.exports = {
    entry: "./entry.js",
    output: {
        path: "dist",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                    presets: [
                        "react",
                        "es2015"
                    ]
                }
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader",
                include: /node_modules/
            },
            {
                test: /\.scss$/,
                loaders: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.html$/,
                loader: "file-loader?name=[name].[ext]"
            }
        ]
    },
    devServer: {
        historyApiFallback: true
    },
    resolve: {
        root: [
            require('path').resolve('.')
        ]
    }
};