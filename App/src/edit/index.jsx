import React, {Component} from 'react';
import Head from '../common/head';
import Foot from '../common/foot';
import SVG from '../common/SVG';
import editPage from './edit.scss';
import {render} from 'react-dom';
// import PropTypes from 'prop-types';
import utils from '../common/utils';

// 验证、获取uid去用户列表页面、编辑图片



// class createQbank extends Component
class  Qbank extends React.Component{
    constructor(props){
        super(props);
        // 编辑、获取数据
        let xhr = new XMLHttpRequest(), temp;
        let qbankid = (temp = location.pathname.match(/\/([\w]*)$/)) ? temp[1] : '';
        this.state = {
            qbank_name: '',
            time: "60",
            qbank_material_url: null,
            total_question: 1,
            qbank_id:""
        }
        if(!qbankid || qbankid === 'edit') return;
        this.setState({
            qbank_id: qbankid
        })
        let fn = utils.promisify(utils.ajax);
        let promise = fn('get','http://localhost:3001/getqbank?qbankid='+qbankid,null);
        let that = this;
        promise.then((result)=>{
            that.setState({
                qbank_name: result.data.qbank_name || '',
                time: result.data.time+'',
                qbank_material_url: result.data.qbank_material_url || null,
                total_question: result.data.total_question
            });
        });
    }
    finish_edit(next){
        let data = new FormData();
        for(let key in this.state){
            data.append(key, this.state[key]);
        }
        let fn = utils.promisify(utils.ajax);
        let promise = fn('post','http://localhost:3001/updateQbank', data);
        let that = this;
        promise.then((result)=>{
            if(!!next){
                that.add_question(result);
            }else{
                let url = `http://localhost:3004/list/${result.data.user_id}`;
                history.pushState(null,'我的题目',url);
                history.go();
            }
        },(err)=>{
            console.log(err);
        });
    }
    add_question(result){
        let url = `http://localhost:3004/edit_question/${result.data.qbank_id}`;
        history.pushState(null,'新增题目',url);
        history.go();
    }
    handleData(e,key){
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
                [key]: e.currentTarget.value
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
            // reader.onprogress = function(evt){
            //     console.log(evt);
            //     // precentLoaded = Math.round(evt.loaded / evt.)
            // }
            reader.onload = function(evt){
                let url = reader.result;
                imgDOM.src = url;
            }
            reader.readAsDataURL(select_file);
            this.handleData(e, 'qbank_material_url');
        }
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
                    <SVG type="more" classes="nb_font_head"/>
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
                    <button className="nb_btn nb_btn_primary" onClick={(e)=>this.finish_edit('next')}>开始添加题目</button>
                    <button className="nb_btn nb_btn_primary" onClick={(e)=>this.finish_edit()}>完成</button>
                </div>
                <Foot/>
            </div>

        );
    }
}
// Qbank.PropTypes = {
//     qbank_name: React.PropTypes.string.isRequired,
//     reply_rule: React.PropTypes.string.isRequired,
//     qbank_material_url: React.PropTypes.object.isRequired
// }
export default Qbank;
