import React from 'react';
import {Link} from 'react-router-dom';
// import rank from '.rank.scss';
import Head from '../common/head';
import Foot from '../common/foot';
import QbankItem from '../common/qbankListItem';
import test_data from '../test_data';
class QbankRank extends React.Component{
    render(){
        return (
            <div className="nb_wrap">
                <Head leftType="home" rightType="account" centerType="title" title="NBbrain"/>
                <div className="nb_content">
                    <nav className="nb_rank_nav">
                        <Link to="/rank" className="nb_btn nb_btn_outline">挑战排行榜</Link>
                        <Link to="/qbank_ranking" className="nb_btn nb_btn_primary">题库排行榜</Link>
                    </nav>
                    <ul className="nb_rank_list">
                        {test_data.qbanksRank.data.map((item,index) => <QbankItem key={index} item={item}/>)}
                    </ul>
                </div>
                <Foot/>
            </div>
        );
    }
}
export default QbankRank;
