import React, {Component} from 'react';
import './animation.scss';
export default class Ant extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      rollback: false
    }
  }
  rollback(val){
    this.setState({
      rollback: val
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
        <li className = {`item item1`} onMouseOver={(e)=>{this.rollback(true)}} onMouseOut={(e)=>{this.rollback(false)}}>
        <div className="roll-wrap">
          <div className="roll-box">
            <p className="roll-front">
            1
            </p>
            <p className={`roll-back animated ${this.state.rollback ? 'flip': ''}`}>
            已
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
