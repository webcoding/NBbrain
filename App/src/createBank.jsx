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
    add_item(e){
        e.currentTarget.innsertBefore(this.refs.addCheckItem.cloneNode(true));
    }
    validate(){

    }
    addImage(e){
        let input = e.currentTarget;
        let select_file = input.files[0];
        let type_list = [];
        if(!(type_list.includes(select_file.type))){
            alert('选择的文件格式不支持，请重新选择！');
        }else{
            let reader = new FileReader(select_file);
            let imgDOM = this.refs.showImage;
            reader.onprogress = function(evt){
                console.log(evt);
                // precentLoaded = Math.round(evt.loaded / evt.)
            }
            reader.onload = function(evt){
                let url = reader.result;
                imgDOM.src = url;
            }
            // reader.readAsDataURL(select_file);
        }
    }
    render(){
        return (
            <div className="nb_wrap">
                <h3 className="nb_title">新增题库</h3>
                <div className="nb_content">
                    <dl className="nb_create_item flex">
                        <dt>题库名</dt>
                        <dd><input placeholder="请输入题库名称" type="text" maxLength="20"/></dd>
                    </dl>
                    <dl className="nb_create_item">
                        <dt>素材</dt>
                        <dd>
                            <button className="nb_btn nb_btn_primary">选择</button>
                            <input type="file" onChange={(e)=>this.addImage.bind(this, e)}/>
                            <div className="imageBox">
                                <img ref="showImage"/>
                                <div className="selectedImageArea"></div>
                            </div>
                        </dd>
                    </dl>
                    <dl className="nb_create_item">
                        <dt>答题规则</dt>
                        <dd><textarea placeholder="请输入答题规则"></textarea></dd>
                    </dl>
                    <button className="nb_btn nb_btn_primary" onClick={this.finish_edit}>开始添加题目</button>
                    <button className="nb_btn nb_btn_primary" onClick={this.finish_edit}>完成</button>
                </div>
            </div>

        );
    }
}
export default Qbank;
