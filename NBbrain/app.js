/*
* @Author: mengyue
* @Date:   2016-07-14 06:51:28
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-01-24 17:40:53
*/

'use strict';

import koa  from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import views from 'koa-views';
import mount from 'koa-mount';
import serve from 'koa-static';
import body from 'koa-better-body';
import cors from 'koa-cors';
import db from './connect.js';
import path from 'path';

// import cors from 'cors';

var app = new koa();

app.use(logger());
app.use(body());
app.use(cors({
    origin: 'http://localhost:3004',
    credentials: true,   //跨域时是否允许其他域发送cookie, omit不允许其他域, same-origin同域, include允许；会导致cookie无法读取
    methods:['GET', 'PUT', 'POST'],
    headers: 'Content-Type,Authorization,X-Requested-With,ajax_log_id'
}));
app.use(bodyParser({
    enableTypes:['json', 'form'],
    formLimit: '50mb',
    jsonLimit: '50mb',
    textLimit: '100kb',
    multipart: true
}));
app.use(views(__dirname + '/views', {
    extension: 'ejs',
    // map: {}
}));
app.use(mount('/upload', serve(path.join(__dirname ,'./upload'))));
app.use(mount('/static', serve('interactive')));

// app.use(mount('/upload'), serve('materials'))
// app.use(function(ctx){
//     ctx.set();
// })
import router from './router/router.js'
// app.use(router.middleware())
// app.use(views());
// app.use(mount());
// app.proxy = true;
// app.keys = ['NBbrain']
// session
// socket

// app.use(ctx => {
//     ctx.body = 'hello world';
//     console.log(ctx.path)
// })

// import Router from 'koa-router';
// var router = new Router();
// router.get('/', async (ctx) => {
//     // console.log(111)
//     ctx.body = 'hello';
//     // ctx.res.write('你好')
//     // console.log(getLoginUser(this));
//     // // yield newestQuestion();
//     // if(getLoginUser(this, next)){
//     //   // yield newestChallenge();
//     // }
// });
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3001);
app.on('error', function(err, ctx){
    console.log('server error', err)
})


