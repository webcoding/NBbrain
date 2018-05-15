import crypto from 'crypto';
import fs from 'fs';
import config from '../config';
import path from 'path';
import zlib from 'zlib';
// 创建Hash('md5')得到生成器, update(str)  生成,   digest('hex')最终
// Hmac('sha1',key)  彩虹表攻击, key--密钥  openssl生成
// Cipher('',key)加密   生成的key文件，update(data, i_encoding, o_encoding), final()
// Decipher解密    Sign签名    Verify验证    DiffieHellman

// update和final得到加密后数据，update返回部分数据，可以多次
// 算法：md5, sha, rsa-*, dsa-*   getHashes()得到算法
// Certificate
// exportChallenge   exportPublicKey
// verifySpkac

// hex  utf8   base64
export function md5Encrypt(password){
    let hash = crypto.createHash('md5');
    hash.update(password + 'NBbrain');
    return hash.digest('hex');
}
export function chiptorEncrypt(ctx, username, password){
    // const iv = crypto.randomBytes(16);
    let cip = crypto.createCipher('aes-256-cbc', config.authKey);
    let result = '';
    let ip = ctx.ip;
    let str = username + '|' + password + '|' + ip;
    result += cip.update(str, 'utf8', 'hex');
    result += cip.final('hex');
    return result;
}

export async function saveFile(file,qbank_id, question_id){
    if(file && file[0] && file[0].name){
        let file_path = path.resolve(__dirname , '../upload');
        let oldPath = file[0].path;
        qbank_id = qbank_id ? qbank_id + '_' : '';
        question_id = question_id ? question_id + '_' : '';
        let fileName = qbank_id + question_id + file[0].name;
        let newPath =  file_path + '/'+ fileName;
        let exists = fs.existsSync(file_path);
        if(!exists){
            fs.mkdirSync(file_path);
        }
        fs.renameSync(oldPath, newPath);
        return fileName;
    }
}

export function promisify(API){
    return (...args)=>{
        return new Promise((resolve, reject)=>{
            API(...args,(response,err)=>{
                let temp = '';
                response.on('data',(data)=>{
                    temp += data;
                });
                response.on('end',()=>{
                    temp = JSON.parse(temp);
                    resolve(temp)
                })
                response.on('error',(e)=>{
                    reject(e)
                })
            })
        })
    }
}

export function zipData(data){

}

export var status = {
    success(ctx, value){
        ctx.body = {
            code: 200,
            message: 'sucess',
            data: value
        }
        return false;
    },
    failed(ctx, code){
        ctx.body = {
            code: 500,
            message: message[code] || ''
        }
        return false;
    },
    gotoLogin(ctx){
        ctx.body = {
            code: 512,
            message: 'go to login'
        }
    }
}


export function createRandom(){
    var temp = 'abcdefghigklmnopqrstuvwsyz0123456789_';
    return String(Math.random()).match(/(\d{2})/g).slice(0,20).map(function(d){
        return temp.charAt(d*temp.length/100);
    }).join('');
}
