/*
* @Author: mengyue
* @Date:   2017-08-02 17:55:51
* @Last Modified by:   mengyue
* @Last Modified time: 2017-08-06 19:13:30
*/

'use strict';
import mongoose from 'mongoose'

let promise = mongoose.connect('mongodb://127.0.0.1:27017/NBbrain',{
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

