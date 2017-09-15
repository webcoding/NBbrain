import React from 'react';
import config from './config';

class  NoMatch extends React.Component{
    login(plantform){
        if(plantform==='weixin'){
            let appid = config.weinxin_test.appid;
            let secret = config.weinxin_test.secret;
            let testURL = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`;

        }else if(plantform==='qq'){

        }else{

        }
        $.ajax({
            url: testURL,
            type: 'GET',
            dataTyp: 'jsonp',
            success: function(data){
                console.log(data);
            }
        });
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
export default NoMatch;
