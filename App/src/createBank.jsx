import editPage from './sass/editPage';
import React, {Component} from 'react';
import {render} from 'react-dom';
import PropTypes from 'prop-types';
import utils from './common/utils';

// class createQbank extends Component
class  Qbank extends React.Component{
    componentDidMount(){
        // 编辑、获取数据
        let xhr = new XMLHttpRequest(), temp;
        let qbankid = (temp = location.pathname.match(/\/(\w*)$/)) ? temp[1] : '';
        let result = utils.ajax('get','http://localhost:3001/getqbank?qbankid='+qbankid);
        for(let key in result.data){
            this.state[key] = result.data[key]
        }
    }
    getState(){
        return this.state;
    }
    finish_edit(){

        let data = new FormData();
        utils.ajax('post','http://localhost:3001/updateQbank', data)
    }
    add_item(e){
        e.currentTarget.innsertBefore(this.refs.addCheckItem.cloneNode(true));
    }
    handleData(e,key){
        this.setState({
            [key]: e.currentTarget.value
        });
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
        }
    }
    render(){
        return (
            <div className="nb_wrap">
                <h3 className="nb_title">新增题库</h3>
                <div className="nb_content">
                    <dl className="nb_create_item flex">
                        <dt>题库名</dt>
                        <dd><input placeholder="请输入题库名称" value={this.state.qbank_name} onChange={(e)=>this.handleData(e, 'qbank_name')} type="text" maxLength="20"/></dd>
                    </dl>
                    <dl className="nb_create_item">
                        <dt>素材</dt>
                        <dd>
                            <button className="nb_btn nb_btn_primary">选择</button>
                            <input type="file" onChange={(e)=>this.addImage(e)}/>
                            <div className="editArea">
                            <div className="imageBox">
                                <img className="showImage" ref="showImage"/>
                            </div>
                                <div className="ImageCover"></div>
                                <div className="selectedImageArea"></div>
                            </div>
                        </dd>
                    </dl>
                    <dl className="nb_create_item">
                        <dt>答题规则</dt>
                        <dd><textarea value={this.state.reply_rule}  onChange={(e)=>this.handleData(e, 'reply_rule') placeholder="请输入答题规则"></textarea></dd>
                    </dl>
                    <button className="nb_btn nb_btn_primary" onClick={this.finish_edit}>开始添加题目</button>
                    <button className="nb_btn nb_btn_primary" onClick={this.finish_edit}>完成</button>
                </div>
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
