import button from './sass/button'
import React from 'react';
import config from './config';

class  Login extends React.Component{
    login(plantform){
        let testURL;
        if(plantform==='weixin'){
            let appid = config.weinxin_test.appid;
            let secret = config.weinxin_test.secret;
            let reUrl = `http://localhost:3004/user`;
            let state = 123;
            testURL = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${reUrl}&response_type=code&scope=snsapi_base&state=${state}#wechat_redirect `;
            // testURL = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`;
        }else if(plantform==='qq'){

        }else{

        }
        var xhr = new XMLHttpRequest();
        xhr.open('get', testURL);
        xhr.setRequestHeader('Access-Control-Allow-Headers', '*');
        // xhr.upload.onprogress = function(){
        //     if(xhr.readyState>0){
        //     }
        // }
        xhr.onreadystatechange = function(){
            if(xhr.readyState===4 && xhr.status=== 'success'){
                console.log(xhr.responseText);
            }
        }
        xhr.onload = function(data){
            console.log(data);
        }
        xhr.send();
    }
    render(){
        let appid = config.weinxin_test.appid;
        let secret = config.weinxin_test.secret;
        let reUrl = `http://10.7.248.72:3004/user`;
        let state = 123;
        let testURL = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${reUrl}&response_type=code&scope=snsapi_userinfo&state=${state}#wechat_redirect `;
        return (
            <div className="nb_wrap">
                <div className="nb_content">
                    <a className="nb_btn nb_btn_green" href={testURL}>微信登录</a>
                    <button className="nb_btn nb_btn_primary" onClick={this.login.bind(this, 'qq')}>QQ登录</button>
                    <button className="nb_btn nb_btn_orange" onClick={this.login.bind(this, 'weibo')}>微博登录</button>
                </div>
            </div>
        );
    }
}
export default Login;
