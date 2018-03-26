import React, {Component} from 'react';
import './mask.scss';

export default class Mask extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    let {content, show} = this.props;
    return (
      <div className="nb_mask_wrape" style={{display: show ? '' : 'none'}}>{content}</div>
    )
  }
}
