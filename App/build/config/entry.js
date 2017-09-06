const hotclient = 'webpack-hot-middleware/client?reload=true';
export default {
    index: [hotclient, './src/main'],
    common: [
        hotclient,
        'underscore',
        'react',
        'react-dom',
        // 'classnames',
        'react-router',
    ]
}
