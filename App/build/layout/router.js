import os from 'os'
let netWorkInf = os.networkInterfaces();
const ip = netWorkInf.en0[1].address;
let config = {
    title: 'NBbrain',
    staticTag: '',
    localIP: ip,
    port: '3002'
}
export default function(app){
    app.get('/index', (req, res)=>{
        res.render('./main', config);
    });
    app.use(/^[\w|/?]+$/,function(req, res, next){
        res.render('./main', config);
    });
    app.use(/^([\w|\/]+)+\/(\w+)\.js$/,function(req,res,next) {
        if(req.params && req.params.length>1 && req.params[1]){
           res.redirect(`/${req.params[1]}.js`);
        }
        res.end();
   });
}
