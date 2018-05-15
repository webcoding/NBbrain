import React, {Component} from 'react';
import Mask from '../mask';
import SVG from '../SVG';
import './toast.scss';

export default class Toast extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    let {msg, closeCb, show} = this.props;
    const closeCallback = function(e){
      if(closeCb){
        closeCb(e)
      }
    }
    let content = (<div className="nb_toast_wrape">
    <div className="nb_toast_content">
      <header>
        提醒
        <span   onClick={closeCallback}><SVG  type="close" classes="nb_right_top"/></span>
      </header>
      <p className="nb_toast_msg">{msg}</p>
    </div>
  </div>);
    return (
      <div>
        <Mask show={show} content={content}/>
      </div>
    )
  }
}
