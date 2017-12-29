import https from 'https';
import config from '../config';
import { createData, createRandom, promisify } from '../common/utils';
import {hasToken, saveUserMsg, isExistUser, getUserMsg} from '../common/user'

export async function weixinLogin(code, uid){
    let appid = config.weinxin_test.appid;
    let secret = config.weinxin_test.secret;
    let userLoginMsg = null;
    // 根据uid获取用户信息
    if(!!uid){
        return await getUserMsg(uid);
    }else{
        let url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appid}&secret=${secret}&code=${code}&grant_type=authorization_code`;
        let permission = await getPermission(url);
        let userMsg = !!permission && await isExistUser(permission.openid);
        console.log(userMsg);
        if(!userMsg && !!permission){
            let access_token = permission.access_token;
            let openid = permission.openid;
            let uid = await isAvaliable(access_token, openid)
            return await getUserBaseMsg(access_token, openid, uid);
        }
        return userMsg;
    }
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
export async function getUserBaseMsg(token, openid, uid){
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
