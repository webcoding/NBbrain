import https from 'https';
import config from '../config';
import { createData, createRandom, promisify } from '../common/utils';
import {hasToken, saveUserMsg, isExistUserAnduserId, isThisUser} from '../common/user'

export async function weixinLogin(code, uid){
    let appid = config.weinxin_test.appid;
    let secret = config.weinxin_test.secret;
    let userLoginMsg = null;
    // 根据uid获取用户信息
    let url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appid}&secret=${secret}&code=${code}&grant_type=authorization_code`;
    let permission = await getPermission(url);

    // 新用户
    if(!!permission){
        let access_token = permission.access_token;
        let openid = permission.openid;
        await isAvaliable(access_token, openid);
        let userMsg = await getUserBaseMsg(access_token, openid);
        let dbUid = await isExistUserAnduserId(userMsg.openid);
        uid = !!uid && isThisUser(uid,userMsg.nickname) ? uid : dbUid && dbUid.user_id ? dbUid.user_id : createRandom();
        await saveUserMsg(userMsg,uid,access_token);
        userMsg.user_id = uid;
        return userMsg;
    }
    // 老用户
    // 不是同一个用户----切换用户
}

async function getPermission(url){
    return await promisify(https.get)(url);
    // let temp = '';
    // let result = null;
    // https.get(url, (res)=>{
    //     res.on('data', (data)=>{
    //         temp += data;
    //     });
    //     res.on('end', ()=>{
    //         result = JSON.parse(temp);
    //     });
    // });
    // return result;

}
// 获取用户基本信息
export async function getUserBaseMsg(token, openid){
    return await promisify(https.get)(`https://api.weixin.qq.com/sns/userinfo?access_token=${token}&openid=${openid}&lang=zh_CN`)
    // await https.get(`https://api.weixin.qq.com/sns/userinfo?access_token=${token}&openid=${openid}&lang=zh_CN`, async(res)=>{
    //     let temp = null;
    //     let result = '';
    //     res.on('data', (data)=>{
    //         result += data;
    //     });
    //     res.on('end', async(data)=>{
    //         await saveUserMsg(result, uid, token, (err, data)=>{
    //             if(err){
    //                 console.log(err.errmsg);
    //             }else{
    //                 temp = data;
    //                 console.log('保存用户信息',data);
    //             }
    //         });
    //     });
    //     return temp;
    // });
}
// 如何返回数据？
export async function isAvaliable(token, openid){
    return await promisify(https.get)(`https://api.weixin.qq.com/sns/auth?access_token=${token}&openid=${openid}`)
    // return await https.get(`https://api.weixin.qq.com/sns/auth?access_token=${token}&openid=${openid}`, (res)=>{
    //     let result = '';
    //     let uid = '';
    //     res.on('data', (data)=>{
    //         result += data;
    //     });
    //     res.on('end', ()=>{
    //         result = JSON.parse(result);
    //         if(!result.errcode){
    //             uid = createRandom();
    //         }
    //     });
    //     return uid;
    // })
}


export async function getRefreshToken(token){
    let appid = config.weinxin_test.appid;
    https.get(`https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=${appid}&grant_type=refresh_token&refresh_token=${token} `, (res)=>{
      let result = '';
      res.on('data', (data)=>{
          result += data;
      });
      res.on('end', ()=>{
      });
    })
}
