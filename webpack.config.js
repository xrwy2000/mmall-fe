/*
* @Author: HP
* @Date:   2019-05-17 15:52:34
* @Last Modified by:   HP
* @Last Modified time: 2019-05-23 11:34:32
*/
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
//环境变量配置,dev /online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

//获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name){
	return {
		template:'./src/view/'+name+'.html',
		filename:'view/'+name+'.html',
		inject:true,
		hash:true,
		chunks:['common',name]
	}
}
var config ={
	entry:{
		'common': ['./src/page/common/index.js'],
		'index': ['./src/page/index/index.js'],
		'login': ['./src/page/login/index.js'],
	},
	output:{
		path:'./dist',
		publicPath:'/dist',
		filename:'js/[name].js',

	},
	externals:{
		'jquery':'window.jQuery'
	},
	module:{
		loaders: [
			{ test: /\.css$/,loader: ExtractTextPlugin.extract("style-loader","css-loader") },
			{ test: /\.(gif|png|jpg|woff|eot|ttf)\??.*$/,loader: 'url-loader?limit=100&name=../resoure/[name].[ext]' }

		]
	},
	plugins: [
		//独立通用模块到js/base.js
		new webpack.optimize.CommonsChunkPlugin({
			name : 'common',
			filename : 'js/base.js'//output的path,都会输出到那个目录下

		}),
		//把css单独打包到文件里
		new ExtractTextPlugin("css/[name].css"),
		//html模板处理
		new HtmlWebpackPlugin(getHtmlConfig('index')),
		new HtmlWebpackPlugin(getHtmlConfig('login')),
	]
};
if('dev'==WEBPACK_ENV){
	config.entry.common.push('webpack-dev-server/client?http://localhost:8088');
}
module.exports = config;