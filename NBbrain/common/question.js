/*
* @Author: mengyue
* @Date:   2017-08-03 16:52:20
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-03-28 17:41:10
*/

'use strict';
import _ from 'lodash'
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
                {$project: {_id:0, len: {$size: "$questions"}, total_question: 1}}
            ]);
            // 完成后，不可再增加题目
            if((totalQuestion.len+1) >= totalQuestion.total_question){
                complish_statue = 1;
            }
            await qbanksModel.findOneAndUpdate(
                {qbank_id: data.qbank_id},
                {
                    $currentDate: {update_time: true},
                    $push: {questions:_.pick(data,updateQuestion)},
                    complish_statue: complish_statue
                }
            );
            return {question_id: data.question_id};
        }else{
            data.items = data.items && data.items.split(',');
            data.answers = data.answers && data.answers.split(',');
            await qbanksModel
                .findOneAndUpdate({$and: [{qbank_id: data.qbank_id}, {"questions.question_id": data.question_id}]},
                    {
                        $currentDate: {update_time: true},
                        $addToSet:{questions:_.pick(data,updateQuestion)}
                    }
                );
            return {question_id: data.question_id};
        }
    }
}

export async function getQuestionMsg(qbank_id, question_id = null){
    let part =  await qbanksModel.aggregate([
        {
            $match:{
                qbank_id: qbank_id
            }
        },{
            $project:{
                _id: 0,
                len: {$size: "$questions"},
                question_ids: "$questions.question_id",
                qbank_id: 1,
                total_question: 1
            }
        }
    ]);
    if(!!question_id){
        let data = await qbanksModel.findOne({
            qbank_id: qbank_id,
            "questions.question_id": question_id
        },{
            "questions.question_id": 1,
            "questions.question_name":1,
            "questions.time_limit": 1,
            "questions.items":1,
            "questions.answers": 1,
            "questions.score": 1,
        })
        let temp = _.assign(part[0], _.find(data.questions,{question_id: question_id}));
        return _.pick(temp,['question_ids','index','len','qbank_id','total_question','_doc']);
    }else{
        return part[0];
    }
}

export async function getUserQbanks(uid){
    return await qbanksModel.aggregate([
        {$match:{user_id: uid}},
        {$project:{
            _id: 0,
            qbank_id:1, qbank_name:1, qbank_material_url:1,update_time:1,complish_statue:1,
            questions: 1,
            question_number: {$size: "$questions"},
            total_question: 1,
            question_ids:"$questions.question_id"
        }}
    ]).exec();
}


// export async function getRecentUpdateQbank(count){
//     let qbanks = await qbanksModel.find({complish_statue: 3},{
//         user_id: 1,
//         qbank_name: 1,
//         qbank_id: 1,
//         qbank_material_url: 1,
//         total_score: {$sum: "$questions.score"}
//     }).sort({update_time: -1});
//     console.log(qbanks);
//     return null;
//     // let user = await userModel.find({user_id: {$elemMatch: qbanks}})
// }

export async function getRecentUpdateQbank(count){
    return await qbanksModel.aggregate([
        {$lookup:{
            from: "users",
            localField: "user_id",
            foreignField: "user_id",
            as: "user_msg"
        }},
        {$match: {complish_statue: 3, qbank_id:{$exists: true} }},
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


export async function getQbankRank(){
    return await qbanksModel.aggregate([
        {
            $lookup:{
                from: 'users',
                localField: 'user_id',
                foreignField: 'user_id',
                as: 'update_rank'
            }
        },
        {
            $group: {
                id: "$user_id",
                qbank_ids: {$push: "$qbank_id"}
            }
        },
        {
            $project:{
                user_id: 1,
                nickname: 1,
                headimgurl: 1,
                title: 1,
                scores: {$sum: "$scores.score"}, //总得分
                qbanks: {$size: "$qbank_ids"}, // 贡献题库数
                challenges: {$size: "$challenges"}, //挑战次数
            }
        }
    ])
}
// 提交
export async function submitQbanks(qbankid){
    return await qbanksModel.findOneAndUpdate({qbank_id: qbankid},{$set:{complish_statue:2}})
}
// 审核
export async function checkedQbank(qbankid){
    return await qbanksModel.findOneAndUpdate({qbank_id: qbankid},{$set:{complish_statue:3}})
}
// 待审核
export async function getCheckQbankList(){
    return await qbanksModel.find({complish_statue:2});
}
