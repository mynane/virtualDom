var path = require('path');
var webpack = require('webpack');
var eslint = require('eslint');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src2/index.jsx",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loaders: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.jsx$/,
                include: [
                    path.resolve(__dirname, "./src2")
                ],
                exclude: /node_modules/,
                loader: 'eslint-loader'
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
            }
        ]
    },
    resolve: {
        extensions: [' ', '.ts', '.js', '.jsx', '.json', '.coffee']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new webpack.LoaderOptionsPlugin({
         options: {
           eslint: './.eslintrc'
         }
       }),
       new webpack.ProvidePlugin({
            "React": "react",
        }),
    ],
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
    }
}