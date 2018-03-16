import React, {Component} from 'react';
import './animation.scss';
export default class Ant extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      status: false
    }
  }
  update(val){
    this.setState({
      status: val
    })
  }
  render(){
    let arr = [], i = 16;
    while(i--){
      arr.push(i);
    }
    let items = arr.map((item)=>{
          <li className = {`item${item}`}>{item}</li>
        })
    return (
      <ul className="container">
        <li className ="item item1">
          <div className="roll-wrap">
            <div className="roll-box" onMouseOver={(e)=>{this.update(true)}} onMouseOut={(e)=>{this.update(false);}}>
              <p className={`roll-front ${this.state.status ? 'roll-backed': ''}`}>
              正面
              </p>
              <p className={`roll-back ${this.state.status ? 'roll-fronted': ''}`}>
              反面
              </p>
            </div>
          </div>
        </li>
        <li className = "item item2">2</li>
        <li className = "item item3">3</li>
        <li className = "item item4">4</li>
        <li className = "item item5">5</li>
        <li className = "item item6">6</li>
        <li className = "item item7">7</li>
        <li className = "item item8">8</li>
        <li className = "item item9">9</li>
        <li className = "item item10">10</li>
        <li className = "item item11">11</li>
        <li className = "item item12">12</li>
        <li className = "item item13">13</li>
        <li className = "item item14">14</li>
        <li className = "item item15">15</li>
        <li className = "item item16">16</li>
      </ul>
    )
  }
}
