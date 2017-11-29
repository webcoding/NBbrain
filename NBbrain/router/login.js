import https from 'https';
import config from '../config';
import { createData, createRandom } from '../common/utils';
import {hasToken, saveUserMsg, isExistUser, getUserMsg} from '../common/user'

export async function weixinLogin(code, uid){
    let appid = config.weinxin_test.appid;
    let secret = config.weinxin_test.secret;
    let result = '';
    let userLoginMsg = null;
    // 根据uid获取用户信息
    if(!!uid){
        return getUserMsg(uid);
    }else{
        userLoginMsg = hasToken(uid);
    }
    // 获取token
    if(!userLoginMsg){
        await https.get(`https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appid}&secret=${secret}&code=${code}&grant_type=authorization_code`, (res)=>{
            res.on('data', (data)=>{
                result += data;
            });
            res.on('end', ()=>{
                result = JSON.parse(result);
                if(!result.errcode){
                    // cookie中uid不可用，使用openid获取用户信息
                    let temp = isExistUser(result.openid);
                    if(!!temp){
                        return temp;
                    }else{
                        // access_token是可用的
                        isAvaliable(result.access_token, result.openid, function(){
                            // 获取用户信息
                            uid = createRandom();
                            getUserBaseMsg(result.access_token, result.openid, uid);
                        })

                    }
                }
            });
        });
    }else{
        // 不获取access_token，但是否过期？
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
            saveUserMsg(result, uid, token, (err, data)=>{
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
