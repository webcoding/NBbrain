import React, {Component} from 'react';
import Mask from '../mask';
import './toast.scss';

export default class Toast extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    let {msg} = this.props.msg;
    return (
      <dialog class="nb_toast_wrape">
        <Mask/>
        <div class="nb_toast_content">
          <header>
            提醒
            <SVG  type="close" classes=""/>
          </header>
          <p>{msg}</p>
        </div>
      </dialog>
    )
  }
}
