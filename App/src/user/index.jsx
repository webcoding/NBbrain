import React from 'react';
import users from './user.scss';
import Foot from '../common/foot';
import Head from '../common/head';
import SVG from '../common/SVG';
import config from '../config';

export default class  User extends React.Component{
    constructor(props){
        super(props);
        this.state={
            basic: null,
            qbanks:0
        }
    }
    componentWillMount(){
        let xhr = new XMLHttpRequest(), temp;
        let uid = (temp = location.pathname.match(/\/(\w*)$/)) ? temp[1] : '';
        xhr.open('get',`${config.env}/user?uid=${uid}`, true);
        xhr.withCredentials = true;
        xhr.send(null);
        let response;
        let that = this;
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                response = JSON.parse(xhr.response);
                if(!!response.data){
                    that.setState({basic:response.data.basic});
                }
            }
        }
    }

    render(){
        let default_data
        if(!this.state.basic){
            default_data = {
                headimgurl: 'http://localhost:3004/static/default_avater.png',
                nickname: '懒虫未设',
                title: '还未获得称号'
            }
            // return <p>数据还未获取到</p>;
        }
        let {nickname, headimgurl,title} = this.state.basic || default_data;

        return (
            <div className="nb_wrap">
                <Head>
                    <SVG classes="nb_font_head" type="back"/>
                    <h3>用户中心</h3>
                    <SVG classes="nb_font_head" type="system"/>
                </Head>
                <div className="nb_content">
                    <div className="nb_user_wrap nb_flex nb_ver_center">
                        <span className="nb_user_avator_box">
                            <img src={headimgurl}/>
                        </span>
                        <div>
                            <h3 className="nb_user_name">{nickname}</h3>
                            <span className="nb_user_title">{title}</span>
                        </div>
                    </div>
                    <ul className="nb_history_list nb_flex">
                        <li className="nb_flex_equal">
                            <SVG type="star_fill" classes="nb_font_align"/>
                            <a>我的收藏</a>
                        </li>
                        <li className="nb_flex_equal">
                            <SVG type="challenge_now" classes="nb_font_align"/>
                            <a>我的挑战</a>
                        </li>
                    </ul>
                </div>
                <Foot/>
            </div>
        );
    }
}

