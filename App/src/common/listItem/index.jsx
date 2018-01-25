import React from 'react';
import {Link} from 'react-router-dom';
import SVG from '../SVG';
import button from '../button';
import listItem from './listItem.scss';
class ListItem extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let {headimgurl, nickname, qbank_id, title, qbank_material_url, qbank_name, user_id, total_score} = this.props.item;
        let avator = null;
        if(!headimgurl){
            avator = <SVG type="avatar_girl" classes="nb_list_avator nb_font_middle nb_right_gap"/>
        }else{
            avator = <img className="nb_list_avator" src={headimgurl}/>
        }
        return (
                <li className="nb_list_item">
                    <div className="nb_list_qbnk nb_flex">
                        <p className="nb_qbank_matrial">
                            <img src={qbank_material_url}/>
                        </p>
                        <div className="nb_list_oprate nb_flex_default">
                            <div className="nb_list_user nb_flex nb_flex_between">
                                <span className="nb_list_message">
                                    {headimgurl}
                                    <i className="nb_user_name">{nickname}</i>
                                    <i className="nb_user_title">{title}</i>
                                </span>
                                <Link to="" className="nb_btn nb_btn_outline nb_button_small nb_btn_yellow">
                                    <SVG type="challenge_now" classes="nb_font_align nb_font_middle"/>GO
                                </Link>
                            </div>
                            <h4 className="nb_list_qbank_name">{qbank_name}</h4>
                            <div className="nb_list_qbank_value nb_flex nb_flex_between">
                                <p>
                                    <SVG type="total_score" classes="nb_font_align nb_font_default nb_font_small nb_right_gap"/>
                                    {total_score}
                                </p>
                                {/* <p>
                                    <SVG type="challenge_now" classes="nb_font_align nb_font_default nb_font_small nb_right_gap"/>
                                    {challenge_total}
                                </p>
                                <p>
                                    <SVG type="star" classes="nb_font_align nb_font_default nb_font_small nb_right_gap"/>
                                    {collect_total}
                                </p> */}
                            </div>
                        </div>
                    </div>
                </li>
                );
            }
        }
export default ListItem;
