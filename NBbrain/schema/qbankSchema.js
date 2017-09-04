/*
* @Author: mengyue
* @Date:   2017-08-03 11:26:54
* @Last Modified by:   mengyue
* @Last Modified time: 2017-08-10 14:05:54
*/

'use strict';

import mongoose from 'mongoose'
import {createRandom} from '../common/utils'
// import materialSchema from './material.js'
// import questionSchema from './question.js'
var questionSchema = new mongoose.Schema({
        question_id: {type: String, unique: true, require: true},
        question_name: String,
        items: [String],
        answers: [String],
        time_limit: {type:Number, default: 10},
        score: {type: Number, default: 1},
        material_url: mongoose.Schema.Types.Mixed,
        // 限制存入图片的大小？
    });
var qbankSchema = new mongoose.Schema({
    user_id: {type: String},
    qbank_id: {type: String, unique: true, require: true},
    qbank_name: String,
    reply_rule: String,
    // icon: String,
    create_time: {type: Date, default: Date.now},
    update_time: {type: Date, default: Date.now},
    qbank_material_url:mongoose.Schema.Types.Mixed,
    challenged_question_count: Number,  //题目被挑战过的次数
    questions: [questionSchema]
});
let qbanksModel = mongoose.model('qbanks', qbankSchema);
export default qbanksModel;
