import React, {Component} from 'react';
import history from '../history';
import Head from '../common/head';
import Foot from '../common/foot';
import SVG from '../common/SVG';
import editPage from './edit.scss';
import {render} from 'react-dom';
import Toast from '../common/toast';
import config from '../config';
import utils from '../common/utils';

// 验证、获取uid去用户列表页面、编辑图片

// class createQbank extends Component
class  Qbank extends React.Component{
    constructor(props){
        super(props);
        // 编辑、获取数据
        let temp;
        let qbankid = (temp = location.pathname.match(/\/([\w]*)$/)) ? temp[1] : '';
        this.state = {
            qbank_name: '',
            time: "60",
            qbank_material_url: null,
            total_question: 10,
            qbank_id:""
        }
        if(!qbankid || qbankid === 'edit') return;
        let fn = utils.promisify(utils.ajax);
        let url = `${config.env}/getqbank?qbankid=${qbankid}`;
        let promise = fn('get',url,null);
        let that = this;
        promise.then((result)=>{
            let {qbank_name, time, qbank_material_url,total_question} = result.data;
            this.questions = result.data.questions;
            that.setState({
                qbank_name: qbank_name,
                time: time+'',
                qbank_material_url: qbank_material_url,
                total_question: total_question,
                qbank_id: qbankid
            });
        });
    }
    // user_id 写入localstorage中
    finish_edit(next){
        if(this.modify && this.validate()){
            let data = new FormData();
            for(let key in this.state){
                data.append(key, this.state[key]);
            }
            let fn = utils.promisify(utils.ajax);
            let url = `${config.env}/updateQbank`
            let promise = fn('post', url, data);
            let that = this;
            promise.then((result)=>{
            },(err)=>{
                console.log(err);
            });
        }
        let uid = utils.store('uid');
        if(!next){
            let url = `/list/${uid}`;
            history.push(url);
        }
    }
    add_question(data){
        this.finish_edit('next');
        let qbankid = this.state.qbank_id
        let url = `/edit_question/${qbankid}`;
        history.push(url);
    }
    handleData(e,key){
        this.modify = true;
        if(e.currentTarget.type==='file'){
            this.setState({
                [key]: e.currentTarget.files[0]
            });
        // }else if(e.currentTarget.type==='radio'){
        //     this.setState({
        //         [key]: parseInt(e.currentTarget.parentNode.textContent)
        //     });
        }else{
            this.setState({
                [key]: parseInt(e.currentTarget.value)
            });
        }
    }
    addImage(e){
        let input = e.currentTarget;
        let select_file = input.files[0];
        let type_list = ['image/jpeg','image/png','image/gif'];
        if(!(type_list.includes(select_file.type))){
            alert('选择的文件格式不支持，请重新选择！');
        }else{
            let reader = new FileReader();
            let imgDOM = this.refs.showImage;
            reader.onload = function(evt){
                let url = reader.result;
                imgDOM.src = url;
            }
            reader.readAsDataURL(select_file);
            this.handleData(e, 'qbank_material_url');
        }
    }
    validate(){
        for(var key in this.state){
            if((!!this.state[key])===false && key != 'qbank_id'){
                console.log(key);
                this.isError = true;
                this.msg = `${key}填写有误，请检查修正后再保存`;
                return false;
            }
        }
        return true;
    }
    render(){
        let img = null;
        img = this.state.qbank_material_url ? <img className="showImage" src={this.state.qbank_material_url} ref="showImage"/> : <img className="showImage" ref="showImage"/>;
        let list = null, time = ["60", "120", "180"];
        list = time.map((item)=>{
            return (<label key={`time_${item}`}>
            <input type="radio" name="time" checked={this.state.time===item} value={item} onChange={(e)=>this.handleData(e, 'time')}/>{item}S
            </label>)
        })
        return (
            <div className="nb_wrap">
                <Head>
                    <SVG type="back" classes="nb_font_head"/>
                    <h3>新增题库</h3>
                    <SVG type="published" onClick={(e)=>{this.upload()}} classes="nb_font_head"/>
                </Head>
                <div className="nb_content">
                    <dl className="nb_create_item flex">
                        <dt>题库名</dt>
                        <dd><input placeholder="请输入题库名称" value={this.state.qbank_name || ''} onChange={(e)=>this.handleData(e, 'qbank_name')} type="text" maxLength="20"/></dd>
                    </dl>
                    <dl className="nb_create_item">
                        <dt>素材</dt>
                        <dd>
                            <button className="nb_btn nb_btn_primary">选择</button>
                            <input type="file" onChange={(e)=>this.addImage(e)}/>
                            <div className="editArea">
                            <div className="imageBox">
                                {img}
                            </div>
                                <div className="ImageCover"></div>
                                <div className="selectedImageArea"></div>
                            </div>
                        </dd>
                    </dl>
                    <dl className="nb_create_item">
                        <dt>答题时长</dt>
                        <dd>
                            {list}
                        </dd>
                    </dl>
                    <dl className="nb_create_item">
                        <dt>题目个数</dt>
                        <dd>
                            <input type="number" value={this.state.total_question} onChange={(e)=>{this.handleData(e,'total_question')}} />
                        </dd>
                    </dl>
                    {!!this.questions && this.questions.length < this.state.total_question &&
                    <button className="nb_btn nb_btn_primary" onClick={(e)=>this.add_question()}>
                     开始添加题目
                    </button>
                    }
                    <button className="nb_btn nb_btn_primary" onClick={(e)=>this.finish_edit()}>完成</button>
                </div>
                <Foot/>
                { this.isError && <Toast msg={this.msg}/>}
            </div>

        );
    }
}
export default Qbank;
