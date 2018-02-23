import React from 'react';
import {Link} from 'react-router-dom';
import SVG from '../SVG';
import './myQbankList.scss';
class QbankListItem extends React.Component{
    constructor(props){
        super();
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

        return (
                <li className="nb_list_item nb_flex nb_ver_center">
                    <img src={qbank_material_url}/>
                    <div className="nb_list_qbnk">
                        <div className="nb_flex nb_flex_between nb_qbank_name">
                            <span className="nb_list_qbank_name">
                                {qbank_name}
                                <i className="nb_list_progress">{complish_text}</i>
                            </span>
                            <Link to={`/edit/${qbank_id}`} className="nb_btn nb_btn_radius">
                                {operator}
                            </Link>
                        </div>
                        <div className="nb_list_question">
                        {!!questions && questions.map((every)=>(
                            <Link to={`/edit_question/${qbank_id}/${every.question_id}`}>
                                <h4 className="nb_list_questionName">{every.question_name}<span>{every.time_limit}</span></h4>
                                {
                                    !!every.items && every.items.map((item,index)=>(
                                        (every.answers[0].charCodeAt()-65)=== index ? <p className="nb_list_option nb_list_correct">{item}</p> : <p className="nb_list_option">{item}</p>
                                        ))
                                }
                                {/* <Item items={every.items} answer={every.answers[0]}/> */}
                            </Link>
                        ))}
                        </div>
                    </div>
                </li>
                );
            }
        }
export default QbankListItem;
