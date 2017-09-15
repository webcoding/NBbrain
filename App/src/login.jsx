import button from './sass/button'
import React from 'react';
import config from './config';

class  Login extends React.Component{
    login(plantform){
        let testURL;
        if(plantform==='weixin'){
            let appid = config.weinxin_test.appid;
            let secret = config.weinxin_test.secret;
            testURL = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`;

        }else if(plantform==='qq'){

        }else{

        }
        var xhr = new XMLHttpRequest();
        xhr.open('get', testURL);
        xhr.onload = function(each){
        }
        xhr.send();
    }
    render(){
        return (
            <div className="nb_wrap">
                <div className="nb_content">
                    <button className="nb_btn nb_btn_green" onClick={this.login.bind(this, 'weixin')}>微信登录</button>
                    <button className="nb_btn nb_btn_primary" onClick={this.login.bind(this, 'qq')}>QQ登录</button>
                    <button className="nb_btn nb_btn_orange" onClick={this.login.bind(this, 'weibo')}>微博登录</button>
                </div>
            </div>
        );
    }
}
export default Login;
