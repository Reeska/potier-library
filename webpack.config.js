'use strict';
var webpack = require('webpack'), 
	path = require('path');

var app = path.join(__dirname, 'app');

module.exports = {
	context : app,
	entry : {
		app : ['babel-polyfill', './main.js']
	},
	output : {
		filename : 'build/bundle.js'
	},
	externals: {
		'angular': 'angular'
	},
    module: {
	  loaders: [
	    {
	      test: /\.jsx?$/,
	      exclude: /(node_modules|bower_components)/,
	      loader: 'babel',
	      query: {
	        presets: ['es2015']
	      }
	    }
	  ]
	}    
};