var webpack = require('webpack');
var path = require('path');
var template = require('./build/layout/main');
// 编译出的js与css，与template结合、route


export default {
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
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js','.jsx']
    },
    devtool: 'eval-source-map',
    // devServer:{
    //     port: 3003,
    //     inline: true,
    //     colors: true,
    //     proxy: {
    //         '/api': 'http://localhost:3003'
    //     }
    // },
    module: {
        rules: [{
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
            test: /.css$/,
            use:['style-loader','css-loader']
        },{
            test: /.scss$/,
            use: ['sass-loader']
        },{
            test: /\.(png|jpg|gif)$/,
            use: ['url-loader', 'file-loader']
        }]
    },
    plugins: [
        new WebapckBuildNotifierPlugin({
            title: 'NBbrain 项目'
        }),
        new ExtractTextPlugin("[name].css"),
        new webpack.optimize.CommonsChunkPlugin('common.js',['common']),
        new HtmlWebpackPlugin({
            title: 'NBbrain',
            // filename: 'index.html',
            // 设置loader,!!loader!路径，默认有ejsloader；或者在use里面添加loader
            template: template,
            // 注入的位置
            inject: true,
            // minify
            // hash
            // cache
            // excludeChunks
            // favicon
        }),
        // 自动打开浏览器、或更新
        new WebpackBrowserPlugin()
        // 定义全局变量
        // new webpack.DefinePlugin({

        // })
    ]
}
