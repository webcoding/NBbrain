import React, {Component} from 'react';
import {render} from 'react-dom';

// class createQbank extends Component
class  Qbank extends React.Component{
    getState(){
        return this.state;
    }
    finish_edit(){

    }
    finish_question(){

    }
    add_item(e){
        e.currentTarget.innsertBefore(this.refs.addCheckItem.cloneNode(true));
    }
    validate(){

    }
    render(){
        return (
            <div className="nb_wrap">
                <h3 className="nb_title">新增题目--1</h3>
                <div className="nb_content">
                    <div className="nb_question">
                        <dl className="nb_create_item">
                            <dt>题目</dt>
                            <dd><input placeholder="请输入题目" type="text"/></dd>
                        </dl>
                        <dl className="nb_create_item">
                            <dt>分值</dt>
                            <dd>
                                <input type="radio" /><label id="scores_1">1分</label>
                                <input type="radio" /><label id="scores_2">2分</label>
                                <input type="radio" /><label id="scores_3">3分</label>
                            </dd>
                        </dl>
                        <dl className="nb_create_item">
                            <dt>答题所需时间</dt>
                            <dd>
                                <input type="radio" /><label id="time_1">10s</label>
                                <input type="radio" /><label id="time_2">15s</label>
                                <input type="radio" /><label id="time_3">20s</label>
                            </dd>
                        </dl>
                        <dl className="nb_create_item" ref="addCheckItem">
                            <dt>添加选项</dt>
                            <dd>
                                <input type="checkbox"/>
                                <input type="text"/>
                            </dd>
                        </dl>
                        <button className="nb_btn nb_btn_outline nb_button_small flex-item gap_left" onClick={this.add_item}>添加选项</button>
                        <button className="nb_btn nb_btn_outline nb_button_small gap_bottom" onClick={this.finish_question}>下一题</button>
                    </div>
                    <button className="nb_btn nb_btn_primary" onClick={this.finish_edit}>完成</button>
                </div>
            </div>

        );
    }
}
export default Qbank;
