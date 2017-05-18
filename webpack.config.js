var path = require('path');
var webpack = require('webpack');
var eslint = require('eslint');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/snabbdom.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, "./src")
                ],
                exclude: /node_modules/,
                loader: 'eslint-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.coffee']
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
       })
    ],
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
    }
}