import React from 'react';
import config from '../config';
import utils from '../common/utils';
import button from '../common/button';
import Foot from '../common/foot';
import Head from '../common/head';
import SVG from '../common/SVG';
import history from '../history';

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
        xhr.open('get',`${config.env}/login?code=${code}` ,true);
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
                        history.push(from);
                        history.goForward();
                    }else{
                        let url = '/user/' + result.data.uid;
                        history.push(url);
                        history.goForward();
                    }
                }
            }
        }
    }
    render(){
        let qq = config.qq;
        let appid = config.weinxin_test.appid;
        let secret = config.weinxin_test.secret;
        let reUrl = `http://oauth.devnode.cn/debug/wechat/index.html`;
        let state = 123;
        let testURL = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${reUrl}&response_type=code&scope=snsapi_userinfo&state=${state}#wechat_redirect `;
        let qqUrl = `http://open.z.qq.com/demo/index.jsp?response_type=code&client_id=${qq.appid}&redirect_uri=${location.href}&state=test`
        return (
            <div className="nb_wrap">
                <Head>
                    <SVG type="back" classes="nb_font_head"/>
                    <h3>登录</h3>
                    </Head>
                <div className="nb_content">
                    <a className="nb_btn nb_btn_green" href={testURL}>微信登录</a>
                    <button className="nb_btn nb_btn_primary" href={qqUrl}>QQ登录</button>
                    <button className="nb_btn nb_btn_orange">微博登录</button>
                </div>
                <Foot/>
            </div>
        );
    }
}
export default Login;
