/*
* @Author: mengyue
* @Date:   2017-08-03 11:26:54
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-01-17 17:58:08
*/

'use strict';

import mongoose from 'mongoose'
// import materialSchema from './material.js'
// import questionSchema from './question.js'

// 扩展插件、实例方法(methods.fn)、静态方法(statics.fn)、复合索引、文档生命周期钩子
// Schema.virtual('virAttr').get(fn)    .set(fn)    实例.virAttr来调用
// 配置：safe:{j:1日志, w: 2副本, wtimeout: 10000}, strict, capped一次操作数据量, versionKey, autoIndex
// shareKey 分布式
// 中途修改Schema结构怎么办？

var questionSchema = new mongoose.Schema({
        question_id: {type: String},
        question_name: String,
        items: [String],
        answers: [String],
        time_limit: {type:Number, default: 10},
        score: {type: Number, default: 1},
        material_url: mongoose.Schema.Types.Mixed,
        // 限制存入图片的大小？
    });
var qbankSchema = new mongoose.Schema({
    _id: Number,
    user_id: {type: String},
    qbank_id: {type: String, unique: true, require: true},
    total_question:{type: Number, default:1},
    complish_statue: {type: Number, default: 0},
    qbank_name: String,
    reply_rule: String,
    time: Number,
    // icon: String,
    create_time: {type: Date, default: Date.now},
    update_time: {type: Date, default: Date.now},
    qbank_material_url:mongoose.Schema.Types.Mixed,
    challenged_question_count: Number,  //题目被挑战过的次数
    collected_question_count: Number,
    questions: [questionSchema]
});



// 发面为Model
// Document == 实例有属性与操作性
let qbanksModel = mongoose.model('qbanks', qbankSchema);
export default qbanksModel;
