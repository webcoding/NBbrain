import React from 'react';
import {Link} from 'react-router-dom';
import rank from './rank.scss';
import Head from '../common/head';
import Foot from '../common/foot';
import RankItem from '../common/rankItem';
import SVG from '../common/SVG';
import test_data from '../test_data';
class Rank extends React.Component{
  render(){
      return (
          <div className="nb_wrap">
              <Head>
                <SVG type="back" classes="nb_font_head"/>
                <h3>排行榜</h3>
                <SVG type="more" classes="nb_font_head"/>
              </Head>
              <div className="nb_content">
                  <nav className="nb_rank_nav nb_tab">
                    <Link to="/rank" className="nb_tab_item current">挑战排行榜</Link>
                    <Link to="/qbank_ranking" className="nb_tab_item">题库排行榜</Link>
                  </nav>
                  <ul className="nb_rank_list">
                      {test_data.rank.data.map((item,index) => <RankItem key={index}  index={index} item={item}/>)}
                  </ul>
              </div>
              <Foot/>
            </div>
        );
    }
}
export default Rank;
