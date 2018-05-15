export default {
    authKey: 'NBbrain',
    weinxin_test:{
        appid:'wx2809d5f8b7a15179',
        secret: '0f917d181fcbee557fa719c25e69718c'
    },
    qq:{
        appid: '1105687350',
        appkey: 'fsSgJRCqShANJhb1'
    },
    cookieConfig:{
        // signed
        domain: 'localhost',  // 写cookie所在的域名
        path: '/',       // 写cookie所在的路径
        maxAge: 24 * 7 * 60 * 1000 * 30, // cookie有效时长
        // expires: new Date('2017-02-15'),  // cookie失效时间
        secure: false,
        httpOnly: false,  // 是否只用于http请求中获取
        overwrite: false  // 是否允许重写
    },
    specialUid: []
}
