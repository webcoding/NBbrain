import webpack  from 'webpack';
// 帮助生成hml, 用script包含webpack bundles
import htmlwebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import {alias, entry, provide} from  './build/config';

// const  webpackServer = require('webpack-dev-server');
// // const  autoprefixer = require('autoprefixer');
// const  ProgressBarPlugin = require('progress-bar-webpack-plugin');
// const  WebpackNotifierPlugin = require('webpack-build-notifier');
// const  config = require('./build/config');
// const  chalk = require('chalk');
// const  ExtractTextPlugin = require('extract-text-webpack-plugin');
// const  path = require('path');

module.exports = {
    entry: entry,
    // context:path.join(__dirname, 'src'),
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '',
        filename: '[name].js',
        // chunkFilename: '[id].[chunkhash].js'
    },
    devtool: 'inline-source-map',
    // devServer: {
    //     contentBase: './static/dist'
    // },
    resolve: {
        extensions: ['.js', '.jsx'],
        // alias: {
        //      _: 'underscore',
        //     React: 'react',
        //     ReactDOM: 'react',
        //     ReactRouter: 'react-router'
        // }
    },
    module: {
        rules: [
            // {
            //     test: /\.jsx$/,
            //     exclude: /node_modules/,
            //     enforce: 'pre',
            //     use: ['jsxhint-loader']
            // },
        {
            test: /\.jsx?$/, exclude: /node_modules/,
            use:[
                {
                    loader: 'react-hot-loader'
                },
                {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react','react-hmre'],
                        plugins: ['transform-runtime']
                    }
                },
            ]
        },{
            test: /\.css$/,
            use: ['style-loader', 'css-loader', 'postcss-loader']
        },{
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'postcss-loader','sass-loader']
        },{
            test: /\.(png|jpg|gif|woff|woff2|ttf|eot|svg|swf)$/,
            use: ['file-loader'],
            // query: {
            //     name: '[name]_[sha512:hash:base64:7].[ext]',
            //     publicPath: ''
            // }
        }]
    },
    // postcss: [
    //     autoprefixer({

    //     })
    // ],
    plugins: [
        new htmlwebpackPlugin({
            title: 'NBbrain'
        }),
        // new ProgressBarPlugin({
        //     summary: false,
        //     format: chalk.green.bold('[:bar] :percent ') + chalk.yellow('(:elapsed seconds) :msg'),
        //     // customSummary (buildTime) {
        //     //     //console每次编程成功都会新生成一行
        //     //     //console.log(chalk.cyan(timestamp()) + chalk.green.bold(" ---------buildTime:" + buildTime + "---------"));
        //     //         process.stdout.write(chalk.cyan(timestamp()) + chalk.green.bold(" ---------buildTime:" + buildTime + "---------"));
        //     //
        //     }
        // ),
        // new WebpackNotifierPlugin({
        //     title: `NBbrain`,
        //     // logo: 'global/img/logo.png',
        //     successSound: 'Submarine',
        //     failureSound: 'Glass',
        //     suppressSuccess: true
        // }),
        // //定义环境变量
        // new webpack.DefinePlugin({
        //     'process.env': {
        //         NODE_ENV: '"development"'
        //     },
        //     __DEV__: true,
        //     __PROD__: false
        // }),
        // new ExtractTextPlugin("[name].css"),
        // // 自动加载模块
        // new webpack.ProvidePlugin({ _: 'underscore',
        // React: 'react',
        // ReactDOM: 'react',
        // ReactRouter: 'react-router'}),
        // 定义变量
        // new webpack.DefinePlugin()
        new webpack.optimize.OccurrenceOrderPlugin(),
        // 热替换
        new webpack.HotModuleReplacementPlugin(),
        // 报错不退出程序
        new webpack.NoEmitOnErrorsPlugin(),
        // 公共文件
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            minChunks: Infinity
        })
    ]
}
