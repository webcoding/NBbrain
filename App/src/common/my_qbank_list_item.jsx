import React from 'react';
import {Link} from 'react-router-dom';
import SVG from './SVG';
import listItem from '../sass/listItem.scss';
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
                                <SVG type="challenge_now" classes="nb_font_weak_yeallow nb_font_span nb_font_large nb_font_align"/>
                                {qbank.challenge_total}
                            </p>
                            <p>
                                <SVG type="collection_n" classes="nb_font_weak_yeallow nb_font_span nb_font_large nb_font_align"/>
                                {qbank.collect_total}
                            </p>
                            <Link to=""><SVG type="edit"  classes="nb_font_weak_yeallow nb_font_span nb_font_large nb_font_align"/></Link>
                        </div>
                    </div>
                </li>
                );
            }
        }
export default ListItem;
