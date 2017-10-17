import React from 'react';
// this.props.loaction.query.bar  获取参数 ?
// this.props.params.id    获取参数 :

class  User extends React.Component{
    componentDidMount(){
        let xhr = new XMLHttpRequest(), temp;
        let uid = (temp = location.pathname.match(/\/(\w*)$/)) ? temp[1] : '';
        xhr.open('get','http://localhost:3001/user?uid='+uid, true);
        xhr.withCredentials = true;
        xhr.send(null);

        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                let response = JSON.parse(xhr.response);
            }
        }
    }

    render(){
        return (
            <div className="nb_wrap">
                <div className="nb_content">
                <h3>用户资料：</h3>
                </div>
            </div>
        );
    }
}
export default User;
