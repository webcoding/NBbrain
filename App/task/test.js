import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import express from 'express';
import webpack from 'webpack';
import webpackConf from '../webpack.dev.config';
import router from '../build/layout/router';
import path from 'path';
// express插件, ajax路径是相对，避免跨域，http代理
// import proxy from 'http-proxy-middle'
let entry = webpackConf.entry;
const hotclient = ['webpack-hot-middleware/client?noInfo=true&reload=true']
Object.keys(entry).forEach((name) => {
    const value = entry[name]
    if (Array.isArray(value)) {
        value.unshift(...hotclient)
    } else {
        entry[name] = [...hotclient, value]
    }
})

let complimer = webpack(webpackConf);
let dev = webpackDevMiddleware(complimer, {
    publicPath: webpackConf.output.publicPath,
});
let hot = webpackHotMiddleware(complimer);
let app = express();
app.enable('strict routing');
app.set('view engine', 'ejs');
app.set('views',path.resolve('./build/layout'));
app.use(dev);
app.use(hot);
// 匹配路由
router(app);
// app.use(proxy('/',{

// }))
// 生成html模板
app.listen(3004, function(err){
    console.log('启动服务')
})
