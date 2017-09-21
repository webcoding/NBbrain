import button from './sass/button'
import React from 'react';
import config from './config';

class  Login extends React.Component{
    componentDidMount(){
        // 根据code获取access_token, 定义为callback更好
        let code = location.search.match(/code=([0-9a-zA-Z]*)/) || [];
        if(!code.length) return;
        let xhr = new XMLHttpRequest();
        let data = new FormData('code', code.length>0 && code[1] || '');
        xhr.open('get','http://localhost:3001/login' ,true);
        xhr.send(data);
        xhr.onreadystatechange = function(){
            console.log(xhr.readyState===4 && xhr.responseText);
        }
    }
    render(){
        let appid = config.weinxin_test.appid;
        let secret = config.weinxin_test.secret;
        let reUrl = `http://oauth.devnode.cn/debug/wechat/index.html`;
        let state = 123;
        let testURL = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${reUrl}&response_type=code&scope=snsapi_userinfo&state=${state}#wechat_redirect `;
        return (
            <div className="nb_wrap">
                <div className="nb_content">
                    <a className="nb_btn nb_btn_green" href={testURL}>微信登录</a>
                    <button className="nb_btn nb_btn_primary">QQ登录</button>
                    <button className="nb_btn nb_btn_orange">微博登录</button>
                </div>
            </div>
        );
    }
}
export default Login;
