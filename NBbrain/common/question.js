/*
* @Author: mengyue
* @Date:   2017-08-03 16:52:20
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-01-19 19:09:25
*/

'use strict';
import _ from 'underscore'
import mongoose from 'mongoose'
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
    return await qbanksModel.findOne({qbank_id: qbankid});
}

// export async function getUsersQbanks(uid){
//     return await qbanksModel.find({user_id: uid});
// }

export async function updateQbankData(data, files){
    if(!data.qbank_id){
        data.qbank_id = createRandom();
        data.qbank_material_url = await saveFile(files,data.qbank_id);
        // data.questions = [{question_id: data.qbank_id}];
        let arr = await qbanksModel.insertMany(data);
        return arr && arr[0];
    }else{
        data.qbank_material_url = await saveFile(files,data.qbank_id);
        return await qbanksModel.update({qbank_id: data.qbank_id},{$set:data})
    }
}



export async function updateQuestionData(data){
    if(data.qbank_id){
        if(!data.question_id){
            data.question_id = createRandom();
            data.items = data.items && data.items.split(',');
            data.answers = data.answers && data.answers.split(',');
            let complish_statue = 0;
            let totalQuestion = await qbanksModel.aggregate([
                {
                    $match:{qbank_id: data.qbank_id}
                },
                {$project: {_id:0, len: {$size: questions}, total_question: 1}}
            ]);
            // 完成后，不可再增加题目
            if((totalQuestion.len+1) >= totalQuestion.total_question){
                complish_statue = 1;
            }
            return await qbanksModel.findOneAndUpdate(
                {qbank_id: data.qbank_id},
                {
                    $currentDate: {update_time: true},
                    $push: {questions:_.pick(data,updateQuestion)},
                    complish_statue: complish_statue
                }
            );
        }else{
            data.items = data.items && data.items.split(',');
            data.answers = data.answers && data.answers.split(',');
            return await qbanksModel
                .findOneAndUpdate({$and: [{qbank_id: data.qbank_id}, {$elemMatch: {question_id: data.question_id}}]},
                    {
                        $currentDate: {update_time: true},
                        $addToSet:{questions:_.pick(data,updateQuestion)}
                    }
                );
        }
    }
}

export async function getUserQbanks(uid){
    return await qbanksModel.aggregate([
        {$match:{user_id: uid}},
        {$project:{
            _id: 0,
            qbank_id:1, qbank_name:1, qbank_material_url:1,update_time:1,complish_statue:1,
            question_number: {$size: "$questions"},
            total_question: 1,
            question_ids:"$questions.question_id"
        }}
    ]).exec();
}


export async function getRecentUpdateQbank(count){
    return await qbanksModel.aggregate([
        {$lookup:{
            from: "users",
            localField: "user_id",
            foreignField: "user_id",
            as: "user_msg"
        }},
        {$match: {complish_statue: 3}},
        {$project:{
            user_id: 1,
            "user_msg.headimgurl": 1,
            "user_msg.nickname": 1,
            "user_msg.title": 1,
            "user_msg.challenged_question_count": 1,
            "user_msg.collected_question_count": 1,
            qbank_name: 1,
            qbank_id: 1,
            qbank_name:1,
            qbank_material_url: 1,
            total_score: {$sum: "$questions.score"}
        }},
        {$sort:{update_time: -1}},
        {$limit: count}
    ]).exec();
}

export async function submitQbanks(qbankid){
    return await qbanksModel.findOneAndUpdate({qbank_id: qbankid},{$set:{complish_statue:2}})
}

export async function checkedQbank(qbankid){
    return await qbanksModel.findOneAndUpdate({qbank_id: qbankid},{$set:{complish_statue:3}})
}

export async function getCheckQbankList(){
    return await qbanksModel.find({complish_statue:2});
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
