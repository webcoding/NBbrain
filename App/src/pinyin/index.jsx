import React from 'react';
export default class pinyin extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return (
      <div className="wrapper">
        <h3>汉字查拼音</h3>
        <input type="text"/>
        <h3>拼音查汉字</h3>
        <input type="text"/>
        <h3>汉字查成语</h3>
        <input type="text"/>
        <h3>成语查拼音</h3>
        <input type="text"/>
      </div>
    )
  }
}
