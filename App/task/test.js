import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import express from 'express';
import webpack from 'webpack';
import webpackConf from '../webpack.dev.config';
import router from '../build/layout/router';

// express插件, ajax路径是相对，避免跨域，http代理
import proxy from 'http-proxy-middle'

let complimer = webpack(webpackConf);
let dev = webpackDevMiddleware(complimer, {

})
let hot = webpackHotMiddleware(complimer);
let app = express();
app.use(dev);
app.use(hot);
// 匹配路由
router(app);
app.use(proxy('/',{

}))
// 生成html模板
app.listen(3003, function(err){
    console.log('启动服务')
})