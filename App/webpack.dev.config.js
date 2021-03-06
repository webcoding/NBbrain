var  webpack = require('webpack');
var  path = require('path');
var  WebapckBuildNotifierPlugin = require('webpack-build-notifier');
var  ExtractTextPlugin = require('extract-text-webpack-plugin');
var  HtmlWebpackPlugin = require('html-webpack-plugin');
var  WebpackBrowserPlugin = require('webpack-browser-plugin');
var  cleanWebpackPlugin = require('clean-webpack-plugin');
// import wepbakDevServer from 'webpack-dev-server';
// import template from './build/layout/template.html';
// 编译出的js与css，与template结合、route
// process.traceDeprecation = true

module.exports = {
    entry: {
        index: './src/main',
        common: [
            'underscore',
            'react',
            'react-dom',
            // 'classnames',
            'react-router',
        ]
    },
    output: {
        // ？
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        // 必须为绝对地址
        publicPath: '/static/',
        // hotUpdateChunkFilename: 'hot/hot-update.js',
        // hotUpdateMainFilename: 'hot/hot-update.json'
    },
    resolve: {
        extensions: ['.js','.jsx','.ejs','.scss']
    },
    watch: true,
    devtool: 'source-map',
    // devServer:{    //整个刷新，而非热更新
    //     port: 3003,
    //     inline: true,
    //     colors: true,
    //     contentBase: './dist',
    //     hot: true,   //开启HRM
    //     // proxy: {
    //     //     '/api': 'http://localhost:3003'
    //     // }
    // },
    module: {
        rules: [{
            test: /.html$/,
            use: 'html-loader',
            enforce: 'pre'
        },{
            test: /.ejs$/,
            use: 'ejs-loader',
            enforce: 'pre'
        },{
            test: /.jsx?$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react','react-hmre'],
                        plugins: ['transform-runtime']
                    }
                }
            ]
        },{
            test: /.ejs$/,
            use: [{
                loader: 'ejs-loader',
                // options: {
                //     query: {
                //         variable: 'data'
                //     }
                // }
            }]
        },{
            test: /\.svg$/,
            loader: 'svg-sprite-loader',
            options: {
                runtimeCompat: true,
                symbolId: 'icon-[name]',
            }
        },{
            test: /.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use:[
                    {loader: 'css-loader', options:{ sourceMap: true}},
                    {loader: 'sass-loader', options: {sourceMap: true}},
                ]
            })
        },{
            test: /\.(png|jpg|gif)$/,
            use: ['url-loader', 'file-loader']
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env":{
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new cleanWebpackPlugin(['dist']),
        new webpack.optimize.UglifyJsPlugin(
            {
                sourceMap: true,
                compress: {
                    warnings: false
                }
            }
        ),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['common']
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),  // HRM提供者，hot与服务通信，局部更新应用模块的能力
        new webpack.NoEmitOnErrorsPlugin(),

        // new WebapckBuildNotifierPlugin({
        //     title: '开发环境 NBbrain  项目'
        // })
        new ExtractTextPlugin("common.css"),
        // new HtmlWebpackPlugin({
        //     title: 'NBbrain',
        //     // template: template,
        //     filename: 'index.html',
        //     // 设置loader,!!loader!路径，默认有ejsloader；或者在use里面添加loader
        //     // 注入的位置
        //     inject: true,
        //     // minify
        //     // hash
        //     // cache
        //     // excludeChunks
        //     // favicon
        // })
        // 自动打开浏览器、或更新
        // new WebpackBrowserPlugin()
        // 定义全局变量
        // new webpack.DefinePlugin({

        // })
    ]
}
