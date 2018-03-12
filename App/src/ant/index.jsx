import React, {Component} from 'react';
import './ant.scss';
export default class Ant extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      hasClass: false,
      index: 1
    }
  }
  start(e){
    self = this.selfDom;
    self.style.left=e.clientX - Math.floor(self.offsetWidth/2);
    self.style.top=e.clientY - Math.floor(self.offsetHeight/2);
    this.setState({
      hasClass: true,
      index: Math.floor(Math.random() * (7 - 1 + 1)) + 1
    })
  }
  render(){
    return (
      <div className="container" onMouseDown={(e)=>{this.start(e)}}>
        <i className={`it color-${this.state.index} ${this.state.hasClass ? 'hidden' : ''} `} ref={(input) => { this.selfDom = input; }}/>
      </div>
    )
  }
}
