import React, {Component} from 'react';
import Head from '../common/head';
import Foot from '../common/foot';
import {render} from 'react-dom';
import SVG from '../common/SVG';
import utils from '../common/utils';
import './question'

// class createQbank extends Component
export default class  Question extends React.Component{
    constructor(props){
        super(props);
        let temp;
        let qbank_id = (temp = location.pathname.match(/\/([a-z0-9\_]*)$/)) && temp.length>1 ? temp[1]: '';
        this.state = {
            qbank_id: qbank_id,
            question_id:'',
            question_name:'',
            time: 0,
            // 验证选项值不能相同
            items:[],
            answers: ['A'],
            score: '1'
        };
    }
    finish_edit(){
        let fn = utils.promisify(utils.ajax);
        let data = new FormData();
        for(let key in this.state){
            data.append(key, this.state[key]);
        }
        let promise = fn('post','http://localhost:3001/updateQuestion',data);
        promise.then((result)=>{
            console.log(result)
        })
    }
    finish_question(){
        this.finish_edit();
        // this.props.index++;
    }
    handleData(e, key, index){
        if(key !== 'items'){
            this.setState({
                [key]: key==='answer'? [e.currentTarget.value] : e.currentTarget.value
            });
        }else{
            let temp = this.state.items;
            temp[index] = e.currentTarget.value;
            this.setState({
                items: temp
            });
        }
    }
    render(){
        let {index} = this.props;
        let score = ['1','2','3'], chioces = ['A','B','C','D'];
        let temp = score.map((item)=>{
            return <label className="nb_choice_score" key={`scores_${item}`} id={`scores_${item}`}>
                <input type="radio" checked={this.state.score===item} value={item} onChange={(e)=>{this.handleData(e,'score')}}/>
            {item}分</label>
        });
        let H_items = chioces.map((item, i)=>{
            return (<label key={`item_${item}`}>
                        <input type="radio" checked={this.state.answer[0]===item} value={item} onChange={(e)=>{this.handleData(e,'answer')}}/>
                        {item}
                        <input type="text" className="nb_item_text" onChange={(e)=>{this.handleData(e,'items', i)}}  placeholder={`选项${item}`} value={this.state.items[i]}/>
                    </label>
            )
        });
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
                                {temp}
                            </dd>
                        </dl>
                        <dl className="nb_createQuestion_item">
                            <dt>答题所需时间</dt>
                            <dd>
                                <input type="number" onChange={(e)=>{this.handleData(e, 'time')}}/>
                            </dd>
                        </dl>
                        <dl className="nb_createQuestion_item nb_create_chioce" ref="addCheckItem">
                            <dt>添加选项并给出正确答案</dt>
                            <dd>
                                {H_items}
                            </dd>
                        </dl>
                    </div>
                    <button className="nb_btn" onClick={(e)=>{this.finish_question()}}>下一题</button>
                    <button className="nb_btn" onClick={(e)=>{this.finish_edit()}}>保存</button>
                </div>
                <Foot/>
            </div>
        );
    }
}

