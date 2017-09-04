import React, {Component} from 'react';
import {render} from 'react-dom';

// class createQbank extends Component
let Qbank = React.createClass({
    getState(){
        return this.state;
    },
    render(){
        return (
            <div class="nb_wrap">
                <h3>开始出题</h3>
                <div class="nb_content">
                    <dl class="nb_create_item">
                        <dt>题库名</dt>
                        <dd><input placeholder="请输入题库名称" type="text" maxlength="20"/></dd>
                    </dl>
                    <dl class="nb_create_item">
                        <dt>素材</dt>
                        <dd><input type="file"/></dd>
                    </dl>
                    <dl class="nb_create_item">
                        <dt>答题规则</dt>
                        <dd><textarea placeholder="请输入答题规则"></textarea></dd>
                    </dl>
                    <div class="nb_question">
                        <h4>开始第一题</h4>
                        <dl class="nb_create_item">
                            <dt>题目</dt>
                            <dd><input placeholder="请输入题目" type="text"/></dd>
                        </dl>
                        <dl class="nb_create_item">
                            <dt>分值</dt>
                            <dd>
                                <input type="radio" for="scores_1"/><label id="scores_1">1分</label>
                                <input type="radio" for="scores_2"/><label id="scores_2">2分</label>
                                <input type="radio" for="scores_3"/><label id="scores_3">3分</label>
                            </dd>
                        </dl>
                        <dl class="nb_create_item">
                            <dt>答题所需时间</dt>
                            <dd>
                                <input type="radio" for="time_1"/><label id="time_1">10s</label>
                                <input type="radio" for="time_2"/><label id="time_2">15s</label>
                                <input type="radio" for="time_3"/><label id="time_3">20s</label>
                            </dd>
                        </dl>
                        <dl class="nb_create_item">
                            <dt>选项与正确答案</dt>
                            <dd>
                                <input type="radio"/>
                                <input type="text"/>
                                <button class="nb_btn nb_btn_del"></button>
                            </dd>
                            <button class="nb_btn nb_btn_outline">添加选项</button>
                        </dl>
                        <button class="nb_btn nb_btn_outline">下一题</button>
                    </div>
                    <button class="nb_btn nb_btn_primary">完成</button>
                </div>
            </div>

        );
    }
});
export default Qbank;
