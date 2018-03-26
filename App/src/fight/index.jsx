import React from 'react';
import utils from '../common/utils';
import config from '../config';
import Toast from '../common/toast'
import '../common/base.scss';
export default class fight extends React.Component{
  constructor(props){
      super(props);
      this.currentIndex = 0;
      this.state={
        question: {}
      };
      this.getData();
  }
  getData(){
    let temp;
    let qbankid = (temp = location.pathname.match(/\/([\w]*)$/)) ? temp[1] : '';
    let url = `${config.env}/getQuestion?qbankid=${qbankid}&index=${this.currentIndex}`;
    let fn = utils.promisify(utils._ajax);
    let promise = fn('get',url,null);
    let that = this;
    promise.then((result)=>{
      this.setState({
        question: result.data.questions[0],
        answer: "",
        score: 0,
        show: false,
        msg: '',
        animateState: "begin"
      });
      this.refs.animate.className += ' begin';
    },(errMsg)=>{
      console.log(errMsg);
    });
  }
  record(e){
    let elem = e.currentTarget;
    if(elem.getAttribute('class')=== this.state.question.answers[0]){
      let oldV = this.state.score;
      this.setState({
        score: oldV + this.state.question.score,
        msg: `<SVG type="great"/>恭喜答对了，获得${this.state.question.score}分`,
        show: true,
        answer: "",
      });
      this.currentIndex++;
      this.getData();
    }else{
      this.setState({
        show: true,
        msg: "<SVG type='close' classes=''/>喔，答错了，再来一局",
      })
    }
  }
  back(){
    history.back();
  }
  render(){
    let {question_name, items, answers, time_limit, score} = this.state.question;
    let temp = ['A','B','C','D'];
    return(
    <div className="">
      <p className={`progress`} ref="animate"/>
      <h3>{question_name}</h3>
      <ul>
        {
          items && items.map((item ,i)=>{
          return (<li  className={temp[i]} onChange={(e)=>{ this.record(e);}}><label><input type="radio" checked={false}/>{temp[i]}、{item}</label></li>)
          })
        }
      </ul>
      <Toast show={this.state.show} msg={this.state.msg} closeCb={this.back}/>
    </div>
    )
  }
}
