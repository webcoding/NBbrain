/*
* @Author: mengyue
* @Date:   2017-08-03 14:30:01
* @Last Modified by:   mengyue
* @Last Modified time: 2017-08-04 14:48:44
*/

'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
export var questionSchema = new Schema({
        question_id: {type: String, unique: true},
        question_name: String,
        items: [String],
        answer: [String],
        time_limit: Number,
        score: Number,
        challenged_times: Number
    });
