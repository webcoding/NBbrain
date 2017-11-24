import React, {Component} from 'react';
import Head from '../common/head';
import Foot from '../common/foot';
import {render} from 'react-dom';
import SVG from '../common/SVG';

// class createQbank extends Component
export default class  Question extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            question_id:'',
            question_name:'',
            time: 0,
            items:[],
            answer: -1,
            score: 0
        };
    }
    handleData(e,key){
        this.setState({
            [key]: e.currentTarget.value
        });
    }
    render(){
        let {index} = this.props;
        return (
            <div className="nb_wrap">
                <Head>
                    <SVG type="back" classes="nb_font_head"/>
                    <h3 className="nb_title">题目--{index}</h3>
                    <SVG type="more" classes="nb_font_head"/>
                </Head>
                <div className="nb_content">
                    <div className="nb_question">
                        <dl className="nb_createQuestion_item">
                            <dt>题目</dt>
                            <dd>
                                <input placeholder="请输入题目" type="text" value={this.state.question_name}  onChange={(e)=>{this.handleData(e, 'question_name')}}/>
                            </dd>
                        </dl>
                        <dl className="nb_createQuestion_item">
                            <dt>分值</dt>
                            <dd>
                                <input type="radio" /><label id="scores_1">1分</label>
                                <input type="radio" /><label id="scores_2">2分</label>
                                <input type="radio" /><label id="scores_3">3分</label>
                            </dd>
                        </dl>
                        <dl className="nb_createQuestion_item">
                            <dt>答题所需时间</dt>
                            <dd>
                                <input type="number"/>
                            </dd>
                        </dl>
                        <dl className="nb_createQuestion_item" ref="addCheckItem">
                            <dt>添加选项并给出正确答案</dt>
                            <dd>
                                <input type="checkbox"/>
                                <input type="text"/>
                            </dd>
                        </dl>
                    </div>
                    <button className="nb_btn" onClick={this.finish_question}>下一题</button>
                    <button className="nb_btn" onClick={this.finish_edit}>完成</button>
                </div>
                <Foot/>
            </div>

        );
    }
}

