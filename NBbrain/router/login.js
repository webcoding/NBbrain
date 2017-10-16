import https from 'https';
import config from '../config';
import { createData } from '../common/utils';
import {hasToken, saveUserMsg} from '../common/user'

export async function weixinLogin(code, uid){
    let appid = config.weinxin_test.appid;
    let secret = config.weinxin_test.secret;
    let result = '';
    let userLoginMsg = null;
    // 是否为已有用户
    await hasToken(uid,(doc)=>{
        userLoginMsg = doc;
    });
    // 获取token
    if(!userLoginMsg){
        await https.get(`https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appid}&secret=${secret}&code=${code}&grant_type=authorization_code`, (res)=>{
            res.on('data', (data)=>{
                result += data;
            });
            res.on('end', ()=>{
                result = JSON.parse(result);
                // getRefreshToken(result.refresh_token);
                if(!result.errcode){
                    isAvaliable(result.access_token, result.openid, function(){
                        getUserBaseMsg(result.access_token, result.openid, uid)
                    })
                }
            });
        });
    }else{
        // 不获取access_token
        getUserBaseMsg(userLoginMsg.access_token, result.userLoginMsg, uid);
    }
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
// 获取用户基本信息
export async function getUserBaseMsg(token, openid, uid){
    https.get(`https://api.weixin.qq.com/sns/userinfo?access_token=${token}&openid=${openid}&lang=zh_CN`, (res)=>{
        let result = '';
        res.on('data', (data)=>{
            result += data;
        });
        res.on('end', (data)=>{
            saveUserMsg(result,uid,(err, data)=>{
                if(err){
                    console.log(err.errmsg);
                }else{
                    console.log('保存用户信息',data);
                }
            });
        });
    })
}
// 如何返回数据？
export async function isAvaliable(token, openid, cb){
    https.get(`https://api.weixin.qq.com/sns/auth?access_token=${token}&openid=${openid}`, (res)=>{
        let result = '';
        res.on('data', (data)=>{
            result += data;
        });
        res.on('end', ()=>{
            result = JSON.parse(result);
            if(!result.errcode){
                cb()
            }
        });
    })
}
