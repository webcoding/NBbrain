/*
* @Author: mengyue
* @Date:   2017-08-03 16:52:20
* @Last Modified by:   mengyue
* @Last Modified time: 2017-08-06 20:17:02
*/

'use strict';
import _ from 'underscore'
import qbanksModel from './schema/qbankSchema.js'
import userModel from './schema/userSchema.js'

let qbanksmodel = new qbanksModel;
let usermodel = new userModel;


function createData(){
    var temp = '=abcdefghigklmnopqrstuvwsyz0123456789_';
    return String(Math.random()).match(/(\d{2})/g).slice(0,6).map(function(d){
        return temp.charAt(d*temp.length/100);
    }).join('');
}


var uid = createData()
var testdata = {
    user_id: uid,
    qbank_id: createData(),
    qbank_name: createData(),
    icon: createData(),
    create_time: {type: Date, default: Date.now},
    update_time: {type: Date, default: Date.now},
    materials: [{
        material_id: createData(),
        material_url: createData(),
        create_time: {type: Date, default: Date.now},
        last_update: {type: Date, default: Date.now},
    }],
    questions: [{
        question_id: createData(),
        question_name: createData(),
        items: [createData(),createData(),createData(),createData()],
        answer: ['A','D'],
        time_limit: 10,
        score: 3,
        challenged_times: 0
    }]
};
var testdata1 =  {
    user_id: uid,
    soc_type: 1,  //微信  QQ  微博
    soc_user_id: createData(),
    nickname: createData(),
    gender: false,
    avatar: createData(),
    description: createData(),
    create_time: {type: Date, default: Date.now},
    last_update: {type: Date, default: Date.now},
    access_token: createData(),
    expire_time: Date,
    title: createData(), //获得的称号
    score: 0, //总得分
    provide_question_count: 0,  //贡献过的题目数
    challenge_question_count: 0, //挑战过的题目数
    challenge_user_count: 0,  // 用户挑战过的总人数
    challenger_count: 0, //挑战过的总次数
    challenged_question_count: 0,  //题目被挑战过的次数
    challenged_times: 0,   // 用户被挑战过的总次数
    challenged_count: 0,   //被多少人挑战过
}
// usermodel.save(testdata1)
// qbanksmodel.save(testdata);
