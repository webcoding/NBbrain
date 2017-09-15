import editPage from './sass/editPage';
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
    add_item(){

    }
    render(){
        return (
            <div className="nb_wrap">
                <h3 className="nb_title">开始出题</h3>
                <div className="nb_content">
                    <dl className="nb_create_item flex">
                        <dt>题库名</dt>
                        <dd><input placeholder="请输入题库名称" type="text" max-length="20"/></dd>
                    </dl>
                    <dl className="nb_create_item">
                        <dt>素材</dt>
                        <dd><input type="file"/></dd>
                    </dl>
                    <dl className="nb_create_item">
                        <dt>答题规则</dt>
                        <dd><textarea placeholder="请输入答题规则"></textarea></dd>
                    </dl>
                    <div className="nb_question">
                        <h4>开始第一题</h4>
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
                        <dl className="nb_create_item">
                            <dt>添加选项</dt>
                            <dd>
                                <input type="checkbox"/>
                                <input type="text"/>
                                <button className="nb_btn nb_btn_outline nb_button_small flex-item gap_left" onClick={this.add_item}>添加选项</button>
                            </dd>
                        </dl>
                        <button className="nb_btn nb_btn_outline nb_button_small gap_bottom" onClick={this.finish_question}>下一题</button>
                    </div>
                    <button className="nb_btn nb_btn_primary" onClick={this.finish_edit}>完成</button>
                </div>
            </div>

        );
    }
}
export default Qbank;
