/*
* @Author: mengyue
* @Date:   2017-08-03 14:23:07
* @Last Modified by:   mengyue
* @Last Modified time: 2017-08-04 15:16:22
*/

'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
export var challengeSchema = new Schema({
    challenges_id: {type: String},
    challenge_type: {type: Number, default: 1},
    result: {type: Number, default: 1},
    score: {type: Number, default: 0},
    create_time: {type: Date, default: Date.now}
});

