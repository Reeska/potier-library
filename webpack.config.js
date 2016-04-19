'use strict';
var webpack = require('webpack'),
    path = require('path');

var app = path.join(__dirname, 'app');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

const sassLoaders = [
    'css?url=false',
    'sass?includePaths[]=' + path.join(__dirname)
];

module.exports = {
    context: app,
    entry: {
        app: ['babel-polyfill', './main.js']
    },
    output: {
        filename: 'build/bundle.js'
    },
    externals: {
        'angular': 'angular'
    },
    module: {
        loaders: [
        /**
         * ES2015 -> ES5 compilation
         */
        {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel',
            query: {
                presets: ['es2015']
            }
        }, 
        /**
         * Required stylesheets compilation for component
         */
        {
            test: /\.scss$/,
            exclude: /main\.scss/,
            loader: 'style!' + sassLoaders.join('!')
        }, 
        /**
         * Main stylesheet (need for first time styles)
         */
        {
            test: /main\.scss$/,
            loader: ExtractTextPlugin.extract('style', sassLoaders.join('!'))
        }]
    },
    plugins: [
        new ExtractTextPlugin('build/[name].css', {
            allChunks: true
        })
    ],
    sassLoader: {
        includePaths: [app, path.join(__dirname, 'img'), path.join(__dirname, 'css')]
    }
};