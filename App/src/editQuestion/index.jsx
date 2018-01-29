import React, {Component} from 'react';
import Head from '../common/head';
import Foot from '../common/foot';
import {render} from 'react-dom';
import SVG from '../common/SVG';
import utils from '../common/utils';
import Toast from '../common/toast';
import './question'

// class createQbank extends Component
export default class  Question extends React.Component{
    constructor(props){
        super(props);
        let temp, question_id, qbank_id;
        temp = location.pathname.match(/edit_question\/([a-z0-9\_]*)([a-z0-9\_]*)$/);
        if(temp.length>2){
            question_id = temp[2];
            qbank_id = temp[1];
        }else if(temp.length>1){
            qbank_id = temp[1];
            question_id = ''
        }
        this.state = {
            qbank_id: qbank_id,
            question_id: question_id,
            question_name:'',
            time: 0,
            // 验证选项值不能相同
            items:[],
            answers: ['A'],
            score: '1',
            index: 0
        };
        let fn = utils.promisify(utils.ajax);
        let promise = fn('get',`http://localhost:3001/getQuestion?qbank_id=${qbank_id}&questionid=${question_id}`, null);
        let that = this;
        promise.then((result)=>{
            console.log(result)
            let {index, len, question_name, time, items, answers, score} = result.data;
            this.question_ids = result.data.question_ids;
            that.setState({
                qbank_id: qbank_id,
                question_id: question_id,
                // question_name: question_name,
                // time: time,
                // items: items,
                // answers: answers,
                // score: score,
                index: index || (len+1)
            })
        })
    }
    finish_edit(save){
        if(this.isModify && this.validate()){
            let fn = utils.promisify(utils.ajax);
            let data = new FormData();
            for(let key in this.state){
                data.append(key, this.state[key]);
            }
            let promise = fn('post','http://localhost:3001/updateQuestion',data);
            let that = this;
            promise.then((result)=>{
                that.setState({
                    question_id: result.data.question_id
                })
            })
        }
        if(!!save){
            let url = `http://localhost:3004/list/${this.state.qbank_id}/`
            utils.go('',url);
            utils.forward()
        }
    }
    next(){
        this.finish_edit();
        utils.refresh();
    }
    prev(){
        this.finish_edit();
        let {question_ids, index, qbank_id} = this.state;
        let url = `http://localhost:3004/edit_question/${qbank_id}/${this.question_ids[index-1]}`
        utils.go('',url);
        utils.forward()
    }
    validate(){
        for(var key in this.state){
            if((!!this.state[key])===false && key !== 'question_id'){
                this.isError = true;
                this.msg = `${key}填写有误，请检查修正后再保存`;
                return false;
            }else if(key==="items" && !(_.uniq(this.state[key]))){
                this.isError = true;
                this.msg = `${key}项不能相同`;
                return false;
            }
        }
        return true;
    }
    handleData(e, key, index){
        this.isModify = true;
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
        let score = ['1','2','3'], chioces = ['A','B','C','D'];
        let temp = score.map((item)=>{
            return <label className="nb_choice_score" key={`scores_${item}`} id={`scores_${item}`}>
                <input type="radio" checked={this.state.score===item} value={item} onChange={(e)=>{this.handleData(e,'score')}}/>
            {item}分</label>
        });
        let H_items = chioces.map((item, i)=>{
            return (<label key={`item_${item}`}>
                        <input type="radio" checked={this.state.answers[0]===item} value={item} onChange={(e)=>{this.handleData(e,'answer')}}/>
                        {item}
                        <input type="text" className="nb_item_text" onChange={(e)=>{this.handleData(e,'items', i)}}  placeholder={`选项${item}`} value={this.state.items[i]}/>
                    </label>
            )
        });
        return (
            <div className="nb_wrap">
                <Head>
                    <SVG type="back" classes="nb_font_head"/>
                    <h3 className="nb_title">题目--{this.state.index}</h3>
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
                    { this.state.index > 1 &&
                        <button className="nb_btn" onClick={(e)=>{this.prev()}}>上一题</button>
                    }
                    {!!this.question_ids && this.state.index < this.question_ids.length &&
                        <button className="nb_btn" onClick={(e)=>{this.next()}}>下一题</button>
                    }
                    <button className="nb_btn" onClick={(e)=>{this.finish_edit('save')}}>保存</button>
                </div>
                <Foot/>
                { this.isError && <Toast msg={this.msg}/>}
            </div>
        );
    }
}

