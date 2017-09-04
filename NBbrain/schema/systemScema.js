/*
* @Author: mengyue
* @Date:   2017-08-03 14:07:59
* @Last Modified by:   mengyue
* @Last Modified time: 2017-08-03 14:09:50
*/

'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var sysSchema = new Schema({
        title_rule: [Schema.type.mixed]
    });

export var sysModel = mongoose.Model('system', sysSchema);