import webpack from 'webpack';
import webpackDevMiddle from 'webpack-dev-middleware';
import webpackHotMiddle from 'webpack-hot-middleware';
// import webpackProxyMiddle from 'webpack-proxy-middleware';
import ejs from 'ejs'; //改变模板引擎

import express from 'express';
import webpackConfig from '../webpack.config';
import router from '../build/layout/router';

// let entry = webpackConfig.entry;

// Object.keys(entry).forEach((name) => {
//     const value = entry[name]
//     if (Array.isArray(value)) {
//         value.unshift(...hotclient)
//     } else {
//         entry[name] = [...hotclient, value]
//     }
// })

// 静态服务
let app = express();
const compiler = webpack(webpackConfig);
const devMiddle = webpackDevMiddle(compiler, {
    serverSideRender: true,
    publicPath: compiler.options.output.publicPath,
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' }
});
const hotMiddle = webpackHotMiddle(compiler, {
    log: false
});
app.use(devMiddle);
app.use(hotMiddle);
// app.use(express.static(__dirname + './dist'))
router(app);
const port = 3002;
const viewDir = `${process.cwd()}/build/layout`;
// app.engine('ejs', ejs({
//     defaultLayout: viewDir
// }));
app.set('views', viewDir);
app.set('view engine', 'ejs');

app.listen(port, function(){
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    // console.log(`server http://`);
})


