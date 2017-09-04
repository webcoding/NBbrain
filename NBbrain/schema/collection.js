/*
* @Author: mengyue
* @Date:   2017-08-03 14:20:43
* @Last Modified by:   mengyue
* @Last Modified time: 2017-08-04 15:16:36
*/

'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
export var collectionSchema = new Schema({
    collect_id: {type: String},
    collect_type: {type: Number, default: 1},
    collect_data: {type: String},
    create_time: {type: Date, default: Date.now},
});

