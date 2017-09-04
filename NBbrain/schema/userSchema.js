/*
* @Author: mengyue
* @Date:   2017-08-03 10:58:24
* @Last Modified by:   mengyue
* @Last Modified time: 2017-08-06 20:45:01
*/

'use strict';
import mongoose from 'mongoose';

var collectionSchema = new mongoose.Schema({
    collect_data: {type: String},  //qbank_id
    create_time: {type: Date, default: Date.now},
});
var challengeSchema = new mongoose.Schema({
    chalenges_data: {type: String, require: true},//user_id 或 qbank_id
    challenge_type: {type: Number, default: 1, enum:[1,2]}, // 人1   题库 2
    result: {type: Number, default: 1, enum: [0, 1]},
    score: {type: Number, default: 0},  //得分
    create_time: {type: Date, default: Date.now}
});
var scoreSchema = new mongoose.Schema({
    rec_id: {type: String},
    score: {type: Number, default: 0},
    remark: {type: String},
    create_time: {type: Date, default: Date.now}
});
var UserSchema = new mongoose.Schema({
    user_id:{type: String, unique: true, require: true},
    // nickname: {type: String, unique: true, require: true},
    username: {type: String, unique: true, require: true},
    password: String,
    can_not_answer: {type: Number, default: 0},
    // soc_type: {type: Number, default: 1, enum: [1,2,3]},  //微信  QQ  微博
    // soc_user_id: {type: String, unique: true},
    gender: {type: Boolean, default: false},
    avatar: String,
    description: String,
    create_time: {type: Date, default: Date.now},
    last_update: {type: Date, default: Date.now},
    access_token: String,
    expire_time: Date,
    title: String, //获得的称号
    score: Number, //总得分
    provide_question_count: Number,  //贡献过的题目数
    collections: [collectionSchema],
    collected_question_count: Number,    //用户收藏的题目总数
    scores: [scoreSchema],
    challenges: [challengeSchema],
    challenge_question_count: Number, //挑战过的题目数  === 挑战过的总次数
    challenge_user_count: Number,  // 用户挑战过的总人数    主动挑战过的人数

    challenged_times: Number,   // 用户被挑战过的总次数   别人--》user
    challenged_count: Number,   //被多少人挑战过    相同人  与 不同的人挑战
});

var userModel = mongoose.model('users', UserSchema);
export default userModel;
