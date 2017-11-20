import React from 'react';
import {Link} from 'react-router-dom';
import '../rank/rank.scss';
import Head from '../common/head';
import Foot from '../common/foot';
import SVG from '../common/SVG';
import QbankItem from '../common/qbankListItem';
import test_data from '../test_data';
class QbankRank extends React.Component{
    render(){
        return (
            <div className="nb_wrap">
                <Head>
                    <SVG type="home" classes="nb_font_head"/>
                    <h3>题库排行榜</h3>
                    <SVG type="account" classes="nb_font_head"/>
                </Head>
                <div className="nb_content">
                    <nav className="nb_rank_nav nb_tab">
                        <Link to="/rank" className="nb_tab_item">挑战排行榜</Link>
                        <Link to="/qbank_ranking" className="nb_tab_item current">题库排行榜</Link>
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
