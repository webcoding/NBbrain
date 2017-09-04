/*
* @Author: mengyue
* @Date:   2016-07-14 06:51:28
* @Last Modified by:   mengyue
* @Last Modified time: 2017-08-06 19:48:42
*/

'use strict';

import koa  from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import views from 'koa-views';
import mount from 'koa-mount';
import serve from 'koa-static';
import body from 'koa-better-body'
import cors from 'koa-cors'
import db from './connect.js'

var app = new koa();

app.use(logger());
app.use(body())
app.use(bodyParser({
    enableTypes:['json', 'form'],
    formLimit: '50mb',
    jsonLimit: '50mb',
    textLimit: '100kb',
    multipart: true
    // strict:
    // extendTypes: {json: ['']}
}));
// app.use(cors());
// app.use(function(ctx){allowCORS(ctx)});
app.use(views(__dirname + '/views', {
    extension: 'ejs',
    // map: {}
}));
app.use(serve(__dirname + '/upload'));
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


