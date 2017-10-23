import React from 'react';
import Footer from './foot';
import Header from './head';
class  List extends React.Component{
    constructor(props){
        super(props);
        this.state={
            qbanks:[]
        }
    }
    componentWillMount(){
        let xhr = new XMLHttpRequest(), temp;
        let uid = (temp = location.pathname.match(/\/(\w*)$/)) ? temp[1] : '';
        xhr.open('get','http://localhost:3001/getUsersQbanks?uid='+uid, true);
        xhr.withCredentials = true;
        xhr.send(null);
        let response;
        let that = this;
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                response = JSON.parse(xhr.response);
                if(!!response.data){
                    that.setState({basic:response.data.qbanks});
                }
            }
        }
    }
    render(){
        return (
            <div className="nb_wrap">
                <Header leftType="back" rightType="menu" centerType="title" title="我的题库"/>
                <div className="nb_content">
                    <dl className="nb_list_item">
                        <dt><img src=""/></dt>
                        <dd>
                            <p>贡献者：<strong></strong></p>
                            <p>题库名</p>
                            <div className="nb_list_oper">
                                <i className="nb_icon nb_icon_star"></i>
                                <i className="nb_icon nb_icon_share"></i>
                                <button className="nb_btn nb_btn_outline nb_btn_primary">开始挑战</button>
                            </div>
                        </dd>
                    </dl>
                </div>
                <Footer/>
            </div>
        );
    }
}
export default List;
