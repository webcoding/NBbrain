/*
* @Author: mengyue
* @Date:   2017-08-02 17:55:51
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-03-23 18:05:40
*/

'use strict';
import mongoose from 'mongoose'

let promise = mongoose.connect('mongodb://120.55.98.137:27017/NBbrain',{
    userMongoClient: true
});
// promise.then(function(db){

// })
let db = mongoose.connection;
db.on('connected', function(){
    console.log('connected!!!');
});
db.on('error', function(err){
    console.log('连接失败',err);
});
db.once('open', function(){
    console.log('连接成功')
},function(err){
    console.log(err);
});

// const mongoose = require('mongodb').MongoClient;
// mongoose.connect('mongodb://120.55.98.137:27017',function(err, client){
//   client.close();
// });
// const db = client.db('NBbrain');
// export const qbnaks = db.collections('qbanks');
// export const users = db.collectons('users');

