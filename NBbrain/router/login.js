import https from 'https';
import config from '../config';
import { createData, createRandom, promisify } from '../common/utils';
import {hasToken, saveUserMsg, isExistUserAnduserId, isThisUser, getUserMsg} from '../common/user'

export async function weixinLogin(code, uid){
    let appid = config.weinxin_test.appid;
    let secret = config.weinxin_test.secret;
    let userLoginMsg = null;
    // 根据uid获取用户信息
    let url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appid}&secret=${secret}&code=${code}&grant_type=authorization_code`;

    //根据cookie返回用户信息
    if(!!uid){
        return await getUserMsg(uid);
    }else{
        let permission = await getPermission(url);
        let access_token = permission && permission.access_token;
        let openid = permission && permission.openid;
        await isAvaliable(access_token, openid);
        // 获取微信用户信息
        let userMsg = await getUserBaseMsg(access_token, openid);
        // 判断是否为已有用户
        let dbUid = await isExistUserAnduserId(userMsg.openid);
        // 如果为已有用户，取uid; 否则创建uid
        uid = !!uid && isThisUser(uid,userMsg.nickname) ? uid : dbUid && dbUid.user_id ? dbUid.user_id : createRandom();
        // 保存或更新用户信息
        await saveUserMsg(userMsg,uid,access_token);
        userMsg.user_id = uid;
        return userMsg;
    }
}

async function getPermission(url){
    return await promisify(https.get)(url);
}
// 获取用户基本信息
export async function getUserBaseMsg(token, openid){
    return await promisify(https.get)(`https://api.weixin.qq.com/sns/userinfo?access_token=${token}&openid=${openid}&lang=zh_CN`)
}
// 如何返回数据？
export async function isAvaliable(token, openid){
    return await promisify(https.get)(`https://api.weixin.qq.com/sns/auth?access_token=${token}&openid=${openid}`)
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
