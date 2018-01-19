/*
* @Author: mengyue
* @Date:   2017-08-03 16:52:30
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-01-19 14:26:03
*/

'use strict';
import {md5Encrypt, chiptorEncrypt} from './utils'
import userSchema from '../schema/userSchema'
import {getUserQbanks} from './question'

export async function hasToken(uid,cb){
    return await userSchema.findOne({user_id: uid},{access_token:1,openid:1})
}

export function getUid(ctx){
    let user_id = ctx.cookies.get('user_id');
    if(!user_id){
        return 0;
    }
    return user_id;

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
            user_id: uid
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
