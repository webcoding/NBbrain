var webpack = require('webpack');
var path = require('path');

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
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.js','.jsx']
    },
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
    }
}