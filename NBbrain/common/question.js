/*
* @Author: mengyue
* @Date:   2017-08-03 16:52:20
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-11-30 11:50:20
*/

'use strict';
import _ from 'underscore'
import {createRandom, saveFile} from '../common/utils'
import qbanksModel from '../schema/qbankSchema.js'
import userModel from '../schema/userSchema.js'
import {updateQuestion} from './v_field';

// new Model(data, true)  严格模式
// 创建实例，可以用这种方式添加数据, 实例.save()
// 或 Model.create(data) 增加数据
let qbanksmodel = new qbanksModel;
let usermodel = new userModel;

// markModified???
// 查询、更新用Model，实例也可以？

function createData(){
    var temp = '=abcdefghigklmnopqrstuvwsyz0123456789_';
    return String(Math.random()).match(/(\d{2})/g).slice(0,6).map(function(d){
        return temp.charAt(d*temp.length/100);
    }).join('');
}
export async function getQbankMsg(qbankid){
    let result;
    await qbanksModel.findOne({qbank_id: qbankid},(err, doc)=>{
        result = doc;
    })
    return result;
}

export async function getUsersQbanks(uid){
    let result;
    await qbanksModel.find({user_id: uid},(err, doc)=>{
        result = doc;
    })
    return result;
}

export async function updateQbankData(data, files){
    let result;
    if(!data.qbank_id){
        data.qbank_id = createRandom();
        data.qbank_material_url = await saveFile(files,data.qbank_id);
        // data.questions = [{question_id: data.qbank_id}];
        await qbanksModel.create(data, function(err, doc){
            if(!err){
                result = doc;
            }else{
                console.log(err.errmsg);
                result = null
            }
        })
    }else{
        data.qbank_material_url = await saveFile(files,data.qbank_id);
        await qbanksModel.update({qbank_id: data.qbank_id},{$set:data},function(err, doc){
            if(!err){
                result = doc;
            }else{
                console.log(err.errmsg);
                result = null
            }
        })
    }
    return result;
}

export async function updateQuestionData(data){
    let result = null;
    if(data.qbank_id){
        if(!data.question_id){
            data.question_id = createRandom();
            await qbanksModel.findOneAndUpdate(
                {qbank_id: data.qbank_id},
                {$set: {questions:[_.pick(data,updateQuestion)]}},
                (err, doc)=>{
                    if(!err){
                        result = doc;
                    }
                });
        }else{
            await qbanksModel
                    .findOne({qbank_id: data.qbank_id})
                    .where('questions.question_id')
                    .in(data.question_id)
                    .update(
                        {$set:{questions:[_.pick(data,updateQuestion)]}},(err, doc)=>{
                            result = doc;
                    })
        }
    }
    return result;
}

export async function getUserQbanks(uid){
    let result;
    await qbanksModel.find({user_id: uid}, {qbank_id:1, qbank_name:1, reply_rule:1, qbank_material_url:1,update_time:1, questions:1}, function(err, doc){
        result = doc;
    });
    return result;
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
