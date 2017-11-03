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
        let {basic_message, qbank} = this.props.item;
        let avator = null;
        if(!basic_message.headimgurl){
            avator = <SVG type="avatar_girl" classes="nb_list_avator nb_font_span "/>
        }else{
            avator = <img className="nb_list_avator" src={basic_message.headimgurl}/>
        }
        return (
                <li className="nb_list_item">
                    <div className="nb_list_qbnk">
                        <p className="nb_qbank_matrial">
                            <img src={qbank.qbank_material_url}/>
                        </p>
                        <h4 className="nb_list_qbank_name">{qbank.qbank_name}</h4>
                        <div className="nb_list_qbank_value">
                            <p>
                                <SVG type="total_score" classes="nb_font_weak_yeallow nb_font_span nb_font_large nb_font_align"/>
                                {qbank.total_score}
                            </p>
                            <p>
                                <SVG type="challenge_now" classes="nb_font_weak_yeallow nb_font_span nb_font_large nb_font_align"/>
                                {qbank.challenge_total}
                            </p>
                            <p>
                                <SVG type="collection_n" classes="nb_font_weak_yeallow nb_font_span nb_font_large nb_font_align"/>
                                {qbank.collect_total}
                            </p>
                        </div>
                    </div>
                    <div className="nb_list_user">
                        {avator}
                        <span className="nb_list_message">
                            <i className="nb_user_name">{basic_message.nickname}</i>
                            <i className="nb_user_title">{basic_message.title}</i>
                        </span>
                        <Link to="" className="nb_btn nb_btn_outline nb_button_small nb_list_item_btn">
                            <SVG type="start_challenge" classes="nb_font_clear_gap nb_font_adjust"/>GO
                        </Link>
                    </div>
                </li>
                );
            }
        }
export default ListItem;
