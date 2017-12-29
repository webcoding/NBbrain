import React from 'react';
import config from '../config';
import utils from '../common/utils';
import button from '../common/button';
import Foot from '../common/foot';
import Head from '../common/head';
import SVG from '../common/SVG';

class  Login extends React.Component{
    componentDidMount(){
        // 根据code获取access_token, 定义为callback更好
        let arr;
        let code = (arr = location.search.match(/code=([0-9a-zA-Z]*)/)) ? arr[1] : '';
        let temp;
        let from = !!(temp = location.search.match(/from=([^&]*)/)) ? temp[1] : null;
        utils.store('from', from);
        if(!code.length) return;
        let xhr = new XMLHttpRequest();
        xhr.open('get','http://localhost:3001/login?code=' + code ,true);
        xhr.withCredentials = true;
        xhr.send(null);
        xhr.onerror = function(err){
            console.log(err);
        }
        xhr.onprogress = function(){
            console.log(xhr.readyState)
        }
        // xhr.setRequestHeader({'X-Requested-With': XMLHttpRequest});
        // xhr.send(data);
        xhr.onreadystatechange = function(){
            if(xhr.readyState===4){
                let result = xhr.response;
                result = JSON.parse(result);
                let uid = result;
                if(result.data.uid){
                    utils.store('uid',result.data.uid);
                    from = utils.store('from');
                    if(!!from){
                        history.pushState(null,'NBbrain',from);
                        history.go(1);
                    }else{
                        let url = 'http://localhost:3004/user/' + result.data.uid;
                        history.pushState(null,'NBbrain',url);
                        history.go(1);
                    }
                }
            }
        }
    }
    test(){
        let xhr = new XMLHttpRequest();
        xhr.open('get','http://localhost:3001/login?uid=222222' ,true);
        // 设置http请求头
        // xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        // 在处理未包含mime-type头部信息的内容时会报错
        // xhr.overrideMimeType("text/xml");
        xhr.withCredentials = true;
        xhr.send(null);
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
                <Head>
                    <SVG type="back" classes="nb_font_head"/>
                    <h3>登录</h3>
                    </Head>
                <div className="nb_content">
                    <a className="nb_btn nb_btn_green" href={testURL}>微信登录</a>
                    <button className="nb_btn nb_btn_primary" onClick={this.test}>QQ登录</button>
                    <button className="nb_btn nb_btn_orange">微博登录</button>
                </div>
                <Foot/>
            </div>
        );
    }
}
export default Login;
