/*
* @Author: mengyue
* @Date:   2017-08-03 16:52:30
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-11-28 11:12:33
*/

'use strict';
import {md5Encrypt, chiptorEncrypt} from './utils'
import userSchema from '../schema/userSchema'
import {getUserQbanks} from './question'

export async function hasToken(uid,cb){
    await userSchema.findOne({user_id: uid},{access_token:1,openid:1}).exec(cb);
}

export function getUid(ctx){
    let user_id = ctx.cookies.get('user_id');
    if(!user_id){
        return -1;
    }
    return user_id;

}

export async function saveUserMsg(data, uid, cb){
    if(!!data.errcode) return;
    data = JSON.parse(data);
    data.user_id = uid;
    if(data && data.nickname){
        // if(await userIsExist(uid)){
            userSchema.update({user_id:uid}, {'$set':data},{upsert: true},cb);
        // }else{
        //     userSchema.create(data,cb);
        // }
    }
}

export async function getUserMsg(uid){
    let result = {};
    await userSchema.findOne({user_id: uid},function(err, doc){
        result.basic = doc;
    });
    result.qbanks = await getUserQbanks(uid);
    return result;
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
    await userSchema.findOne({user_id:uid},(err, doc)=>{
        result = doc;
    });
    return result;
}

export function getLocalUid(ctx){
    let uid;
    return uid = ctx.cookies.get('NBbrainid');
}

export async function userIsExist(uid){
    let result;
    await userSchema.findOne({user_id:uid},(err, doc)=>{
        result = doc;
    });
    console.log(result);
    return result;
}

export function allowCORS(ctx){
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-Requested-With,ajax_log_id');
    ctx.set('Access-Control-Allow-Credentials', true);
}
