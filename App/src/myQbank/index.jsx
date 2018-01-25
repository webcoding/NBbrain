import React from 'react';
import {Link} from 'react-router-dom';
import Head from '../common/head';
import Foot from '../common/foot';
import MyQbankList from '../common/myQbankList';
import SVG from '../common/SVG';
// import test_data from '../test_data';
import utils  from '../common/utils';

class  MyQbank extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            qbanks: []
        }
        let fn = utils.promisify(utils.ajax);
        let promise = fn('get','http://localhost:3001/getMyQbanks',null);
        let that = this;
        promise.then((result)=>{
            that.setState({
                qbanks: result.data
            });
        })
    }
    render(){
        console.log(this.state.qbanks)
        return (
            <div className="nb_wrap">
                <Head>
                    <SVG type="back" classes="nb_font_head" onClick={(e)=>{history.back()}}/>
                    <h3>我的题库</h3>
                    <Link to="/edit"><SVG type="add"  classes="nb_font_head"/></Link>
                </Head>
                <div className="nb_content">
                    <ul className="nb_list">
                    {this.state.qbanks.map((item,index) => <MyQbankList key={index} item={item}/>)}
                    </ul>
                </div>
                <Foot/>
            </div>
        );
    }
}
export default MyQbank;
