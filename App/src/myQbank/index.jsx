import React from 'react';
import Head from '../common/head';
import Foot from '../common/foot';
import MyQbankList from '../common/myQbankList';
import SVG from '../common/SVG';
import test_data from '../test_data';
import utils  from '../common/utils';

class  MyQbank extends React.Component{
    constructor(props){
        super(props);
        this.state={
            qbanks:[]
        }
        utils.ajax('get','http://localhost:3001/getMyQbanks',null, (result)=>{
            console.log(result);
        })
    }
    render(){
        return (
            <div className="nb_wrap">
                <Head>
                    <SVG type="back" classes="nb_font_head"/>
                    <h3>我的题库</h3>
                    <SVG type="system"  classes="nb_font_head"/>
                </Head>
                <div className="nb_content">
                    <ul className="nb_list">
                    {test_data.myQbanks.data.map((item,index) => <MyQbankList key={index} item={item}/>)}
                    </ul>
                </div>
                <Foot/>
            </div>
        );
    }
}
export default MyQbank;
