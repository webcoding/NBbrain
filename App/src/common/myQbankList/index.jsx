import React from 'react';
import {Link} from 'react-router-dom';
import SVG from '../SVG';
import qbankItem from './myQbankList.scss';
class QbankListItem extends React.Component{
    constructor(props){
        super(props);
    }
    Item(props){

    }
    render(){
        let {qbank_id, qbank_name, qbank_material_url, total_question, question_number, complish_statue=0, questions} = this.props.item;
        let complish_text="";
        let operator = null;
        if(complish_statue===0){
            complish_text =`[${question_number}/${total_question}]`;
            operator = <Link to={`/edit/${qbank_id}`}><SVG type="edit" classes="nb_font_middle nb_font_align nb_right_gap"/>编辑</Link>;
        }else if(complish_statue===1){
            complish_text = "[已完成]";
            operator = <i><SVG type="published"  classes="nb_font_middle nb_font_align nb_right_gap"/>发布</i>;
        }else if(complish_statue===2){
            complish_text = "[已发布]";
            operator = <i><SVG type="audit" classes="nb_font_middle nb_font_align nb_right_gap"/>审核中...</i>
        }else if(complish_statue===3){
            complish_text = "[审核通过]"
            operator = <i><SVG type="friend"  classes="nb_font_middle nb_font_align nb_right_gap"/>邀请朋友来挑战</i>
        }
        function Item(props){
            let items = props.items;
            return (
                !!items && tems.map((item,index)=>(
                (every.answers[0].charCodeAt()-65)=== index ?
                        <i className="nb_answer">{item}</i> : <i>{item}</i>
                ))
            )
        }
        return (
                <li className="nb_list_item nb_flex nb_ver_center">
                    <img src={qbank_material_url}/>
                    <div className="nb_list_qbnk nb_flex nb_flex_clomun nb_ver_between">
                        <Link to={`/edit/${qbank_id}`} className="nb_btn nb_btn_radius">{operator}</Link>
                        <h4 className="nb_list_qbank_name">{qbank_name}</h4>
                        <p className="nb_list_progress">{complish_text}</p>
                        {questions.map((every)=>(
                            <div>
                                <h4>{every.question_name}<span>{every.time_limit}</span></h4>
                                <Item key={every.items}/>
                            </div>
                        ))}
                    </div>
                </li>
                );
            }
        }
export default QbankListItem;
