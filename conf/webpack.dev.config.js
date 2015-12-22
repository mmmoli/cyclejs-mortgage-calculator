'use strict';

var webpack = require('webpack'),
    WebpackConfig = require('webpack-config');

module.exports = new WebpackConfig().extend('./conf/webpack.base.config.js').merge({
    filename: __filename,
    debug: true,
    devtool: '#source-map',
    output: {
        pathinfo: true,
        publicPath: 'http://localhost:8080/',
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js'
    },
    entry: {
        app: './src/main.js',
        vendor: [
            //'consolelog',
            //'es5-shim',
            //'es5-shim/es5-sham',
            //'es6-shim',
            //'es6-shim/es6-sham',
            //'json3',
            //'html5shiv',
            //'html5shiv/dist/html5shiv-printshiv.js',
            //'respond'
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js')
    ],
    devServer: {
        contentBase: './public',
        stats: {
            modules: false,
            cached: false,
            colors: true,
            chunk: false
        }
    }
});
