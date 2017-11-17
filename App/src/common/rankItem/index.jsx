import React from 'react';
import { Link } from 'react-router-dom';
import SVG from '../SVG';
import rankItem from './rankItem.scss';
class RankItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let index = this.props.index;
    let { nickname, headimgurl, title, scores, challenges, qbanks } = this.props.item;
    let avator = null;
    if (!headimgurl) {
      avator = <SVG type="avatar_girl" classes="nb_list_avator" />
    } else {
      avator = <img className="nb_list_avator" src={headimgurl} />
    }
    return (
      <li className="nb_rank_item">
        {avator}
        <span className="nb_rank_nickname"><i className="nb_rank_title">[{title}]</i>{nickname}</span>
        <Link to="" className="nb_btn nb_btn_outline">
          <SVG type="challenge_now" classes="nb_font_small"/>GO
        </Link>
        <p className="nb_rank_repution nb_flex nb_flex_between">
          <i>
            <SVG type="total_scores" classes="nb_font nb_font_default nb_font_align nb_font_middle"/>{scores}
          </i>
          <i>
            <SVG type="challenge_now" classes="nb_font nb_font_default nb_font_align nb_font_middle"/>{challenges}
          </i>
          <i>
            <SVG type="qbanks" classes="nb_font nb_font_default nb_font_align nb_font_middle"/>{qbanks}
          </i>
        </p>

      </li>
    )
  }
}
export default RankItem;
