import React from 'react';
import users from './user.scss';
import Foot from '../common/foot';
// this.props.loaction.query.bar  获取参数 ?
// this.props.params.id    获取参数 :

class  User extends React.Component{
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
        xhr.open('get','http://localhost:3001/user?uid='+uid, true);
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
        if(!this.state.basic){
            return <p>数据还未获取到</p>;
        }
        let {nickname, headimgurl} = this.state.basic;
        console.log(Footer);
        return (
            <div className="nb_wrap">
                <div className="nb_content">
                    <div className="nb_user_wrap">
                        <span className="nb_user_avator_box">
                            <img src={headimgurl}/>
                        </span>
                        <span className="nb_user_name">{nickname}</span>
                    </div>
                    <ul className="nb_list_enter">
                        <li><a>我的收藏</a></li>
                        <li><a>我的挑战</a></li>
                        <li><a>我的题库</a></li>
                    </ul>
                </div>
                <Footer/>
            </div>
        );
    }
}
export default User;
