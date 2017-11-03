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
    let fill = '';
    if (!headimgurl) {
      avator = <SVG type="avatar_girl" classes="nb_list_avator nb_font_clear_gap " />
    } else {
      avator = <img className="nb_list_avator nb_font_clear_gap" src={headimgurl} />
    }
    let default_classes = " nb_font_clear_gap nb_font_position";
    switch (index) {
      case 0: fill = "nb_font_weak_red";
        break;
      case 1: fill = "nb_font_weak_orange";
        break;
    }
    fill = fill + default_classes;
    return (
      <li className="nb_rank_item">
        {index < 3 && <SVG type="rank_n" classes={fill}/>}
        {avator}
        <span className="nb_rank_nickname"><i className="nb_rank_title">[{title}]</i>{nickname}</span>
        <p className="nb_rank_repution">
          <i><SVG type="total_scores" classes="nb_font_clear_gap"/>{scores}</i>
          <i><SVG type="challenge" classes="nb_font_clear_gap"/>{challenges}</i>
          <i><SVG type="qbanks" classes="nb_font_clear_gap"/>{qbanks}</i>
          <Link to="" className="nb_btn nb_btn_outline nb_button_small nb_list_item_btn">
              <SVG type="start_challenge" classes="nb_font_clear_gap nb_font_adjust"/>GO
          </Link>
        </p>

      </li>
    )
  }
}
export default RankItem;
