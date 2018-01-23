import os from 'os'
let netWorkInf = os.networkInterfaces();
// console.log(netWorkInf);
// const ip = netWorkInf.en0[1].address;
let config = {
    title: 'NBbrain',
    staticTag: '',
    localIP: '127.0.0.1',
    port: '3004'
}
export default function(app){
    app.get('/index', (req, res)=>{
        res.render('./main', config);
    });
    app.use(/^[\w|/?]+$/,function(req, res, next){
        res.render('./main', config);
    });

    //因为开启了热加载,所有的js文件都是通过'http://10.7.248.201:9091/app.js'这种路径形式访问的
    //但是此项目又用了按需加载，如果访问页面的路径是http://10.7.248.201:9091/index/bind,那么按需加载的js文件路径就是
    //http://10.7.248.201:9091/index/bind_5126021.js,但是开启了热加载之后，这个路径就访问不到
    //所以通过中间件的形式对 /index/bind_xxx.js /a/b/demo.js这样的js文件进行过滤重定向到根目录
    //即访问 http://10.7.248.201:9091/index/bind_5126021.js会自动重定向到http://10.7.248.201:9091/bind_5126021.js
    app.use(/^([\w|\/]+)+\/(\w+)\.js$/,function(req,res,next) {
        console.log(req.params);
        if(req.params && req.params.length>1 && req.params[1]){
           res.redirect(`/${req.params[1]}.js`);
        }
        res.end();
   });
}
