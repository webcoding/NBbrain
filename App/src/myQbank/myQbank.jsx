import React from 'react';
import Head from '../common/head';
import Foot from '../common/foot';
import QbankListItem from '../common/qbankListItem';
import test_data from '../test_data';

class  MyQbank extends React.Component{
    constructor(props){
        super(props);
        this.state={
            qbanks:[]
        }
    }
    // componentWillMount(){
    //     let xhr = new XMLHttpRequest(), temp;
    //     let uid = (temp = location.pathname.match(/\/(\w*)$/)) ? temp[1] : '';
    //     xhr.open('get','http://localhost:3001/getUsersQbanks?uid='+uid, true);
    //     xhr.withCredentials = true;
    //     xhr.send(null);
    //     let response;
    //     let that = this;
    //     xhr.onreadystatechange = function(){
    //         if(xhr.readyState === 4){
    //             response = JSON.parse(xhr.response);
    //             if(!!response.data){
    //                 that.setState({basic:response.data.qbanks});
    //             }
    //         }
    //     }
    // }
    render(){
        return (
            <div className="nb_wrap">
                <Head leftType="back" rightType="accent" centerType="title" title="我的题库"/>
                <div className="nb_content">
                    <ul className="nb_list">
            {test_data.myQbanks.data.map((item,index) => <QbankListItem key={index} item={item}/>)}
                    </ul>
                    <p>完成状态</p>
                </div>
                <Foot/>
            </div>
        );
    }
}
export default MyQbank;
