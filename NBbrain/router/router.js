/*
* @Author: mengyue
* @Date:   2017-08-03 17:21:09
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-03-26 17:34:35
*/

'use strict';
import Router from 'koa-router'
import _ from 'underscore'
import https from 'https'
import userSchema from '../schema/userSchema'
import qbanksModel from '../schema/qbankSchema'
import {newestQuestion, newestChallenge, createQuestion, getQbankMsg, updateQbankData, getUserQbanks, updateQuestionData, getRecentUpdateQbank, submitQbanks, checkedQbank, getCheckQbankList, getQuestionMsg} from '../common/question.js'
import {getQuestion} from '../common/getQbankData';
import { setLoginUser, getLocalUid, getUserAll, getUid, getRecentChallengedQbank} from '../common/user.js'
import {md5Encrypt, createRandom, chiptorEncrypt} from '../common/utils'
import {weixinLogin, getUserBaseMsg} from './login'
import {status} from '../common/utils'
import config from '../config'
import {updateQbank_f} from '../common/v_field';

var router = new Router();
var usermodel = new userSchema;
var qbankmodel = new qbanksModel;

// 状态分发函数


// 登录与注册
router.get('/login', async(ctx) => {
    let code = ctx.query.code;
    // 过期或未登录过
    let uid = ctx.cookies.get('user_id');
    let userMsg = await weixinLogin(code, uid);
    status.success(ctx,{uid: userMsg.user_id});
    ctx.cookies.set('user_id', userMsg.user_id, config.cookieConfig);
});

// 添加题库
router.post('/updateQbank', async(ctx)=>{
    let fields = ctx.request.fields;
    let files = ctx.request.files;
    fields.user_id = getUid(ctx);
    if(!fields.user_id){
        status.gotoLogin(ctx)
    }else{
        let result = await updateQbankData(fields, files);
        let temp = _.pick(result, updateQbank_f);
        temp.user_id = fields.user_id;
        status.success(ctx, temp);
    }
})

// 获取我的题库
router.get('/getMyQbanks', async(ctx)=>{
    let user_id = getUid(ctx);
    if(!user_id){
        status.gotoLogin(ctx)
    }else{
        let result = await getUserQbanks(user_id);
        status.success(ctx, result);
    }
})

// 添加题目
router.post('/updateQuestion', async(ctx)=>{
    let fields = ctx.request.fields;
    let user_id = getUid(ctx);
    if(!user_id){
        status.gotoLogin(ctx)
    }else{
        let result = await updateQuestionData(fields);
        status.success(ctx, result);
    }
})

// 首页接口
router.get('/recentUpdateQbank', async (ctx) =>{
    let result = await getRecentUpdateQbank(5)
    console.log(result.user_msg);
    let temp = _.map(result, function(item){
        let user_msg = _.flatten(_.values(_.pick(item,"user_msg")));
        let _item = _.omit(item,"user_msg", "_id");
        user_msg = !!user_msg && user_msg[0];
        return _.extend(_item,user_msg);
    })
    status.success(ctx, temp);
})
router.get('/recentChallengedQbank', async(ctx)=>{
    let user_id = getUid(ctx);
    if(!!user_id){
        let result = await getRecentChallengedQbank(user_id, 5)
        let temp = _.map(result, function(item){
            let recent_challenge = _.flatten(_.values(_.pick(item,"recent_challenge")));
            let _item = _.omit(item,"recent_challenge", "_id");
            recent_challenge = !!recent_challenge && recent_challenge[0];
            return _.extend(_item,recent_challenge);
        })
        status.success(ctx, temp);
    }else{
        status.success(ctx, null);
    }
})

// user接口
router.get('/user', async(ctx)=>{
    let uid = ctx.query.uid;
    let result = await getUserAll(uid);
    status.success(ctx, result);
})

// 获取题库数据
router.get('/getQbank', async(ctx)=>{
    let qbankid = ctx.query.qbankid;
    let result = await getQbankMsg(qbankid);
    status.success(ctx, result);
})

// 获取题库的题目
router.get('/getQuestion', async(ctx)=>{
    let qbankid = ctx.query.qbankid;
    let index = ctx.query.index;
    // let result = await getQuestionMsg(qbankid, questionid);
    let result = await getQuestion(qbankid, index);
    status.success(ctx, result);
})

router.get('/publishQbanks', async(ctx)=>{
    let qbankid = ctx.query.qbank_id;
    let result = await submitQbanks(qbankid)
    status.success(ctx, result);
})

router.get('/checkQbankList', async(ctx)=>{
    // 权限
    let result = await getCheckQbankList();
    status.success(ctx, result);
})

router.get('/checkQbank', async(ctx)=>{
    let qbankid = ctx.query.qbank_id;
    let result = await checkedQbank(qbankid)
    status.success(ctx, result);
})
export default router;
