import React from 'react';
import {Link} from 'react-router-dom';
import SVG from '../SVG';
import qbankItem from './qbankListItem.scss';
class QbankListItem extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let {qbank_name, qbank_material_url, total_question, question_number, complish_statue} = this.props.item;
        let complish_text="";
        let operator = null;
        if(complish_statue===0){
            complish_text =`[${question_number}/${total_question}]`;
            operator = <Link to="/edit/:qbank_id" className="nb_btn nb_btn_outline"><SVG type="edit"/>编辑</Link>;
        }else if(complish_statue===1){
            complish_text = "[已完成]";
            operator = <span className="nb_btn nb_btn_outline"><SVG type="edit"/>发布</span>
        }else if(complish_statue===2){
            complish_text = "[已发布]";
            operator = <span className="nb_btn"><SVG type="edit"/>审核中...</span>
        }else if(complish_statue===3){
            complish_text = "[审核通过]"
            operator = <span className="nb_btn nb_btn_outline"><SVG type="edit"/>邀请朋友来挑战</span>
        }
        return (
                <li className="nb_list_item">
                    <div className="nb_list_qbnk">
                        <img src={qbank_material_url}/>
                        <h4 className="nb_list_qbank_name">{qbank_name}</h4>
                    </div>
                    {complish_text}
                    {operator}
                </li>
                );
            }
        }
export default QbankListItem;
