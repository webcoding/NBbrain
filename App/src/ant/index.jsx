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
  getPos(e){
    return {
      x: e.pageX,
      y: e.pageY
    }
  }
  init(){
    this.setState({
      hasClass: false
    })
  }
  up(e){
    this.dragging = false;
  }
  moving(e){
    if(this.dragging){
      let self = this.selfDom;
      var x = this.getPos(e).x - this.offsetX;
      var y = this.getPos(e).y - this.offsetY;
      var width = document.documentElement.clientWidth - self.offsetWidth;
      var height = document.documentElement.clientHeight - self.offsetHeight;

      self.style.left = Math.min(Math.max(0, x), width);
      self.style.top = Math.min(Math.max(0, y), height);
      // self.style.transform = `translate(${x}px, ${y}px)`;
      this.setState({
        hasClass: true,
        index: Math.floor(Math.random() * (7 - 1 + 1)) + 1
      })
    }
  }
  down(e){
    let self = this.selfDom;
    this.dragging = true
    this.offsetX = this.getPos(e).x - self.offsetLeft;
    this.offsetY = this.getPos(e).y - self.offsetTop;
  }
  render(){
    return (
      <div className="container">
        <i className={`it color-${this.state.index} ${this.state.hasClass ? 'hidden' : ''} `}  ref={(input) => { this.selfDom = input; }} onAnimationEnd={(e)=>{this.init(e);}} onMouseDown={(e)=>{this.down(e)}} onMouseMove={(e)=>{this.moving(e)}} onMouseUp={(e)=>{this.up(e);}}/>
      </div>
    )
  }
}
