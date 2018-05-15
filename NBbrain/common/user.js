/*
* @Author: mengyue
* @Date:   2017-08-03 16:52:30
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-05-15 18:15:59
*/

'use strict';
import {md5Encrypt, chiptorEncrypt} from './utils'
import userSchema from '../schema/userSchema'
import {getUserQbanks} from './question'

export async function hasToken(uid,cb){
    return await userSchema.findOne({user_id: uid},{access_token:1,openid:1})
}

export async function isExistUserAnduserId(openid){
    return await userSchema.findOne({openid: openid},{user_id:1});
}

export async function isThisUser(uid,nickname) {
    return await userSchema.findOne({user_id:uid, nickname: nickname})
}

export async function saveUserMsg(data, uid, token, cb){
    data.user_id = uid;
    data.access_token = token;
    if(data && data.nickname){
        userSchema.update({user_id: uid}, {'$set':data},{upsert: true},function(err,doc){
            if(!!err){
                console.log('数据更新成功',doc)
            }
        });
    }
}

export async function getRecentChallengedQbank(uid, limit){
    return await userSchema.aggregate([
        {$lookup:{
            from: "qbanks",
            localField: "user_id",
            foreignField: "user_id",
            as: "recent_challenge"
        }},
        {$match:{
            user_id: uid,
            challenges:{$exists: true}
        }},
        {$project:{
            user_id: 1,
            headimgurl: 1,
            nickname: 1,
            title: 1,
            challenged_question_count: 1,
            collected_question_count: 1,
            "recent_challenge.qbank_name": 1,
            "recent_challenge.qbank_id": 1,
            "recent_challenge.qbank_name":1,
            "recent_challenge.qbank_material_url": 1,
            total_score: {$sum: "$questions.score"}
        }},
        {$sort:{update_time: 1}},
        {$limit: limit}
    ]).exec();
}

export async function getChallengeRank(){
    return await userSchema.aggregate([
        {
            $lookup:{
                from: 'qbanks',
                localField: 'user_id',
                foreignField: 'user_id',
                as: 'challenge_rank'
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

// 更新challenge_question_count, score, challenges
/**
 *  chalenges_data: {type: String, require: true},// qbank_id
    challenge_type: {type: Number, default: 1, enum:[1,2]}, // 人1   题库 2
    result: {type: Number, default: 1, enum: [0, 1]},
    score: {type: Number, default: 0},  //得分
    remark: {type: String},
    create_time: {type: Date, default: Date.now}
 */
export async function updateChallengeData(qbankid, score, result){
}

export async function getUserAll(uid){
    let result = {};
    result.basic = await getUserMsg(uid);
    result.qbanks = await getUserQbanks(uid);
    return result;
}

export async function getUserMsg(uid){
    return await userSchema.findOne({user_id: uid});
}

export async function setLoginUser(ctx, username, password){
    var password = md5Encrypt(password);
    var user = await userSchema.findOne({
        username: username,
        password: password
    }, function(err, doc){
        if(doc){
            var result = chiptorEncrypt(ctx, username, password);
            console.log(result, doc.user_id)

            // ctx.cookies.set('NBbrainAuth', result);
            // ctx.cookies.set('NBbrainid',doc.user_id);
        }
    });

}

export async function userIsLogin(){
    let uid = ctx.cookies.get('user_id');
    return await userSchema.findOne({user_id:uid});
}

export function getLocalUid(ctx){
    let uid;
    return uid = ctx.cookies.get('NBbrainid');
}

export async function userIsExist(uid){
    return await userSchema.findOne({user_id:uid});
}

export function allowCORS(ctx){
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-Requested-With,ajax_log_id');
    ctx.set('Access-Control-Allow-Credentials', true);
}
