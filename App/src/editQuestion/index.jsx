import React, {Component} from 'react';
import history from '../history';
import Head from '../common/head';
import Foot from '../common/foot';
import {render} from 'react-dom';
import SVG from '../common/SVG';
import utils from '../common/utils';
import Toast from '../common/toast';
import config from '../config';
import './question'

// class createQbank extends Component
export default class  Question extends React.Component{
    constructor(props){
        super(props);
        let temp, question_id, qbank_id;
        temp = location.pathname.match(/edit_question\/([a-z0-9\_]*)\/?([a-z0-9\_]*)?$/);
        if(temp.length>2){
            question_id = temp[2];
            qbank_id = temp[1];
        }else if(temp.length>1){
            qbank_id = temp[1];
            question_id = ""
        }
        this.state = {
            qbank_id: qbank_id,
            question_id: question_id || "",
            question_name:'',
            time_limit: '',
            // 验证选项值不能相同
            items:[],
            answers: ['A'],
            score: '1',
            index: 0
        };
        let fn = utils.promisify(utils._ajax);
        let promise = fn('get',`${config.env}/getQuestion?qbankid=${qbank_id}&questionid=${question_id || ''}`, null);
        let that = this;
        promise.then((result)=>{
            let {index, len, question_ids, total_question} = result.data;
            let _doc = result.data._doc || {};
            let {question_name, time_limit, items, answers, score, question_id} = _doc;
            this.question_ids = question_ids;
            this.total_question = total_question;
            that.setState({
                qbank_id: qbank_id,
                question_id: question_id || '',
                question_name: question_name || "",
                time_limit: time_limit || "",
                items: items || [],
                answers: answers || ['A'],
                score: !!score && score+'' || '1' ,
                index: _.indexOf(question_ids, question_id)+1 || (len+1)
            })
        })
    }
    finish_edit(save){
        if(this.isModify && this.validate()){
            let data = new FormData();
            for(let key in this.state){
                data.append(key, this.state[key]);
            }
            let fn = utils.promisify(utils._ajax);
            let promise = fn('post',`${config.env}/updateQuestion`,data);
            let that = this;
            promise.then((result)=>{
                that.setState({
                    question_id: result.data.question_id
                })
            })
        }
        if(!!save){
            let url = `/list/${this.state.qbank_id}/`
            history.push(url);
        }
        return true;
    }
    create(){
        if(this.finish_edit()){
            let {qbank_id} = this.state;
            let url = `/edit_question/${qbank_id}`
            history.push(url);
        }
    }
    next(){
        if(this.finish_edit()){
            let {question_ids, index, qbank_id} = this.state;
            let url = `/edit_question/${qbank_id}/${this.question_ids[index]}`
            history.push(url);
        }
    }
    prev(){
        if(this.finish_edit()){
            let {question_ids, index, qbank_id} = this.state;
            let url = `/edit_question/${qbank_id}/${this.question_ids[index-2]}`
            history.push(url);
        }
    }
    validate(){
        for(var key in this.state){
            if((!!this.state[key])===false && key !== 'question_id'){
                console.log(key)
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
                [key]: key==='answers'? [e.currentTarget.value] : e.currentTarget.value
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
                        <input type="radio" checked={this.state.answers[0]===item} value={item} onChange={(e)=>{this.handleData(e,'answers')}}/>
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
                                <input type="number" value={this.state.time_limit} onChange={(e)=>{this.handleData(e, 'time_limit')}}/>
                            </dd>
                        </dl>
                        <dl className="nb_createQuestion_item nb_create_chioce" ref="addCheckItem">
                            <dt>添加选项并给出正确答案</dt>
                            <dd>
                                {H_items}
                            </dd>
                        </dl>
                    </div>
                    {!!this.question_ids && this.question_ids.length < this.total_question &&
                        <button className="nb_btn" onClick={(e)=>{this.create()}}>新建题目</button>
                    }
                    <button className="nb_btn" onClick={(e)=>{this.finish_edit('save')}}>保存</button>
                    { this.state.index > 1 &&
                        <button className="nb_btn" onClick={(e)=>{this.prev()}}>上一题</button>
                    }
                    {!!this.question_ids && this.state.index < this.question_ids.length &&
                        <button className="nb_btn" onClick={(e)=>{this.next()}}>下一题</button>
                    }
                </div>
                <Foot/>
                { this.isError && <Toast msg={this.msg}/>}
            </div>
        );
    }
}

