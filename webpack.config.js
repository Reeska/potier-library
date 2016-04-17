'use strict';
var webpack = require('webpack'), 
	path = require('path');

var APP = path.join(__dirname, 'app');

module.exports = {
	context : APP,
	entry : {
		app : ['webpack/hot/dev-server', './test.js']
	},
	output : {
		path : APP,
		filename : 'build/bundle.js'
	},
	plugins: [  
      new webpack.HotModuleReplacementPlugin()
    ]	
};