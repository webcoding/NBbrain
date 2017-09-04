/*
* @Author: mengyue
* @Date:   2017-08-03 14:24:38
* @Last Modified by:   mengyue
* @Last Modified time: 2017-08-04 15:17:01
*/

'use strict';

export var scoreSchema = new Schema({
    rec_id: {type: String},
    score: {type: Number, default: 0},
    remark: {type: String},
    create_time: {type: Date, default: Date.now}
});

