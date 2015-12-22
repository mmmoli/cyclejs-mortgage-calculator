'use strict';

var path = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    ComponentPlugin = require('component-webpack-plugin'),
    WebpackConfig = require('webpack-config');

module.exports = new WebpackConfig().merge({
    output: {
        path: path.join(__dirname + '/../public')
    },
    resolve: {
        root: [
            __dirname,
            path.join(__dirname, 'src', 'main', 'assets')
        ],
        modulesDirectories: [
            'node_modules'
        ]
    },
    plugins: [
        new ComponentPlugin(),
        new ExtractTextPlugin('[name].css')
    ],
    module: {
        loaders: [{
            test: /\.css$/,
            exclude: /.*\.min.css/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
        }, {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
        }, {
            test: /\.png$/,
            loader: 'url-loader?prefix=img/&limit=5000'
        }, {
            test: /\.jpg$/,
            loader: 'url-loader?prefix=img/&limit=5000'
        }, {
            test: /\.gif$/,
            loader: 'url-loader?prefix=img/&limit=5000'
        }, {
            test: /\.woff$/,
            loader: 'url-loader?prefix=font/&limit=5000'
        }, {
            test: /\.eot$/,
            loader: 'file-loader?prefix=font/'
        }, {
            test: /\.ttf$/,
            loader: 'file-loader?prefix=font/'
        }, {
            test: /\.svg$/,
            loader: 'file-loader?prefix=font/'
        },  {
            test: /\.js?x$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }
        ]
    }
});
