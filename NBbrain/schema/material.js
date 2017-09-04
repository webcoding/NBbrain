/*
* @Author: mengyue
* @Date:   2017-08-03 14:28:27
* @Last Modified by:   mengyue
* @Last Modified time: 2017-08-04 14:48:16
*/

'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
export var materialSchema = new Schema({
        material_id: {type: String, unique: true},
        material_data: String,
        create_time: {type: Date, default: Date.now}, 
        last_update: {type: Date, default: Date.now}, 
    });
