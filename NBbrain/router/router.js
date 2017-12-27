/*
* @Author: mengyue
* @Date:   2017-08-03 17:21:09
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-12-26 17:37:12
*/

'use strict';
import Router from 'koa-router'
import _ from 'underscore'
import https from 'https'
import userSchema from '../schema/userSchema'
import qbanksModel from '../schema/qbankSchema'
import {newestQuestion, newestChallenge, createQuestion, getQbankMsg, updateQbankData, getUsersQbanks, updateQuestionData} from '../common/question.js'
import { setLoginUser, getLocalUid, userIsExist, getUserAll, getUid} from '../common/user.js'
import {md5Encrypt, createRandom, chiptorEncrypt} from '../common/utils'
import {weixinLogin, getUserBaseMsg} from './login'
import {status} from '../common/utils'
import config from '../config'
import {updateQbank_f} from '../common/v_field';

var router = new Router();
var usermodel = new userSchema;
var qbankmodel = new qbanksModel;
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
        status.success(ctx, temp);
    }
})

// 获取我的题库
router.get('/getMyQbanks', async(ctx)=>{
    let user_id = getUid(ctx);
    if(!user_id){
        status.gotoLogin(ctx)
    }else{
        let result = await getUsersQbanks(user_id);
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
router.get('/', async (ctx) =>{
  // 需要验证uid的正确性？
    let uid = getLocalUid(ctx);
    let questionList;
    let challengeList;
    // setLoginUser(ctx, 'test9','nihao')
    if(!!uid){
        challengeList = qbanksModel.find({user_id:uid}).sort({update_date:-1}).limit(5).exec(function(err, doc){
            console.log(doc)
        });
    }
    questionList = qbanksModel.find().sort({'create_time':-1}).limit(5).exec(function(err, doc){
        console.log(doc)
    });
    // console.log(questionList)
    await ctx.render('home.ejs', {
      questions: questionList,
      challenges: challengeList
    })
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



// 添加题目

// 获取用户的题库
router.get('/getUsersQbanks', async(ctx)=>{
    let uid = ctx.query.uid;
    let result = await getUsersQbanks(uid);
    status.success(ctx, result);
})

router.post('/checkLogin', async(ctx) => {
    let temp = ctx.request.body;
    let username = temp.username;
    let password = temp.password;
    // 本地取
    let user = await userSchema.findOne({
        username: username,
        password: md5Encrypt(password)
    });
    console.log(user)
    if(!user){
      ctx.body = '用户名或密码不正确'
    }else{
      let refer = ctx.params && ctx.params.refer || '/';
      setLoginUser(ctx, username, password);
      // refer
      ctx.redirect(refer)
    }
})




router.all('/register', async (ctx) => {
    // 验证
    await ctx.render('register.ejs');
});

router.post('/saveRegiser', async (ctx) => {
    let temp = ctx.request.body;
    let username = temp.username;
    let password = temp.password;
    // let email = nodemail.createEmail(config.stmp);
    console.log(username, password)
    let exist = await userSchema.findOne({
        username: username
    });
    console.log(exist)
    if(exist){
        ctx.body = '用户名已存在'
        return;
    }
    let uid = createRandom();
    usermodel.user_id = uid;
    usermodel.username = username;
    usermodel.password = md5Encrypt(password);

    await usermodel.save();
    setLoginUser(ctx, username, password);
    ctx.redirect('/');
})

router.all('/logout', async(ctx) => {
    ctx.cookies.set('NBbrainAuth',null);
    ctx.redirect('/login');
})

router.get('/createQbank', async(ctx) => {
    let uid = getLocalUid(ctx);
    if(!!uid){
    console.log(getLocalUid(ctx))
        await ctx.render('createQbank.ejs')
    }else{
        ctx.redirect('/login')
    }
});

router.get('/awaitCheck', async(ctx) => {
  ctx.render('/awaitCheck');
});
// 是否为最后一题 last
router.post('/checkQbank', async(ctx) => {
    let fields = ctx.request.fields;
    let files = ctx.request.files;
    let qbank_id = ctx.params && ctx.params.qbnk_id || fields.qbank_id || '';
    let question_id = ctx.params && ctx.params.question_id || fields.question_id || '';
    let uid = getLocalUid(ctx);
    let exist = false;
    let result;
    await userIsExist(uid).then(function(doc){
        if(!!doc) exist = true;
    },function(err){
        exist = false;
    })
    // 需要验证用户ID
    if(exist){
        if(fields.last){
            userSchema.update({user_id: uid},{$inc: { provide_question_count: 1}}).exec()
        }
        // 验证数据，然后保存，只修改其中一个题目，question_id 数组
        // 只追加一个题目 或多个
        // 修改题库
        if(!!qbank_id && qbank_id !== 'null' && !!question_id && question_id !== 'null'){
            await qbanksModel.findOne({qbank_id: qbank_id,'questions.question_id': question_id},function(err, doc){
                result = addQuestion(doc, fields, qbank_id, question_id);
                console.log('2',result)
                qbanksModel.update({qbank_id: qbank_id},result,{
                    upsert: true,
                    multi: true,
                }, function(err, doc){
                    success(ctx, doc);
                });
            })
            // 追加题目
        }else if(!!qbank_id && qbank_id !== 'null'){
            await qbanksModel.findOne({qbank_id: qbank_id}, function(err, doc){
                result = addQuestion(doc, fields, qbank_id);
                qbanksModel.update({qbank_id: qbank_id},result,{
                    upsert: true,
                    multi: true,
                }, function(err, doc){
                    success(ctx, doc);
                });
            });
        }else{
            let temp = _.extend({}, fields), arr = [];
            delete temp.qbank_name;
            delete temp.qbank_material_url;
            delete temp.reply_rule;
            temp.question_id = createRandom();
            arr.push(temp);
            // 创建题库
            let qbank_id = createRandom();
            readFile(fields.qbank_material_url, qbank_id);
            let qbankmodel =  new qbanksModel({
                qbank_id: qbank_id,
                qbank_name: fields.qbank_name,
                qbank_material_url: fields.qbank_material_url || '',
                questions: arr,
                user_id: uid
            });
            await qbankmodel.save();
            let tempObj = {};
            await qbanksModel.findOne({user_id: uid, qbank_id: qbank_id},{qbank_id:1, 'questions.question_id': 1}, function(err,doc){
                tempObj = doc;
            });
            success(ctx, tempObj);
            // ctx.redirect('/awaitCheck')
        }

    }

});

router.get('/reply', async(ctx) =>{
    let qbank_id = ctx.params.qbank_id;
    let user_id = ctx.cookies.user_id;
    userSchema.update({user_id: user_id}, {$inc:{challenge_question_count: 1}}).exec();
    // update callback的参数？
    qbanksModel.update({qbank_id: qbank_id},{$inc: {challenged_question_count: 1}}).findOne({qbank_id: qbank_id}, function(err, doc){
        if(err){
            fail(ctx, err);
        }else{
            success(ctx, doc);
        }
    })
})
// 退出：挑战失败，完成：挑战成绩
// qbank_id
// complete: 1/0
// answers: [[]]
// 获得的成绩更新到总成绩
router.post('/completed_reply', async(ctx) =>{
    let body = ctx.request.body;
    let complete = body.complete;
    let answers = body.answers;
    let qbank_id = body.qbank_id;
    qbanksModel.findOne({qbank_id: qbank_id}, {questions: 1}, function(err, doc){

    })

});

router.get('/qbank_rank_list', async(ctx) => {
    qbanksModel.find().sort({challenged_question_count: -1}).limit(10).exec(function(doc){

    });
});

router.get('/user_rank_list', async(ctx) => {
    userSchema.find().sort({challenge_question_count: -1}).limit(10).exec(function(doc){

    });
});

router.post('/collect', async(ctx) => {
    let qbank_id = ctx.params.qbank_id;
userSchema.update({user_id: uid}, {$and:[
        {$inc: {collected_question_count: 1}},
        {$set: {'collections.collect_data': qbank_id}}]
    }).exec();
});


router.get('/userCenter', async(ctx) => {
    let user_id = ctx.params.user_id;
    userSchema.findOne({user_id: user_id}, function(err, doc){

    });
});

router.get('/userMessage', async(ctx) => {

});

export default router;



function addQuestion(doc, fields, qbank_id, question_id){
    let temp = _.extend({}, fields), arr = [];
        delete temp.qbank_name;
        delete temp.qbank_material_url;
        delete temp.reply_rule;
        doc.questions = doc && doc.questions || [];
    if(!question_id){
        temp.question_id = createRandom();
        readFile(temp.material_url, qbank_id, temp.question_id);
        doc.questions.push(temp);
    }else{
        delete temp.qbank_id;
        temp = _.map(doc.questions, function(v){
            if(v.question_id === question_id){
                readFile(v.material_url, qbank_id, v.question_id);
                return _.extend(v, temp);
            }
        });
        doc.questions = temp;
    }
    return doc;
}

function success(ctx, data){
    ctx.res.type = "application/json";
    ctx.body = JSON.stringify(data);
    return false;
}

function fail(ctx, err){

}
