import React from 'react';
import utils from '../common/utils';
import config from '../config';
import Alert from '../common/Alert'
import '../common/base.scss';
export default class fight extends React.Component{
  constructor(props){
      super(props);
      this.currentIndex = 0;
      this.state={
        question: {},
        show: false
      };
      this.getData();
  }
  gameOver(){
    this.setState({
      msg: '时间到，再来一局',
      show: true,
      answer: this.state.question.answers[0]
    });
    this.updateScore();
  }
  getData(){
    let temp;
    let qbankid;
    qbankid = this.qbankid = (temp = location.pathname.match(/\/([\w]*)$/)) ? temp[1] : '';
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
        animateState: "begin",
        scores: result.data.scores
      });
      this.addClass();
    },(errMsg)=>{
      console.log(errMsg);
    });
  }
  record(e){
    let elem = e.currentTarget;
    let animate = this.refs.animate, TimeoutId;
    if(elem.getAttribute('class')=== this.state.question.answers[0]){
      let oldV = this.state.score;
      this.setState({
        score: oldV + this.state.question.score,
        msg: `恭喜答对了，获得${this.state.question.score}分`,
        show: true,
        answer: "",
        icon: 'great'
      });
      let that = this;
      clearTimeout(TimeoutId);
      TimeoutId = setTimeout(function(){
        that.currentIndex++;
        that.getData();
        that.removeClass();
      },2000)

    }else{
      animate.style.animationPlayState = 'paused';
      this.setState({
        show: true,
        msg: `喔，答错了，本轮挑战得分为${this.currentIndex}，再来一局`,
        answer: this.state.question.answers[0],
        icon: 'close'
      })
    }
  }
  addClass(){
    let animate = this.refs.animate;
    if(animate.className.indexOf('begin')<0){
      animate.className += ' begin';
    }
  }
  removeClass(){
    let animate = this.refs.animate;
    animate.setAttribute('class', animate.className.replace(/begin/,''));
    console.log(animate.className);
  }
  updateScore(){
    let url = `${config.env}/updateScore`;
    let fn = utils.promisify(utils._ajax);
    let promise = fn('post',url,{qbankid: this.qbankid, score: this.currentIndex});
  }
  back(e){
    history.back();
  }
  render(){
    let {question_name, items, answers, time_limit, score, total_question} = this.state.question;
    if(this.currentIndex >= total_question){
      history.forward('./result')
    }
    let temp = ['A','B','C','D'];
    return(
    <div className="">
      <p className={`progress`} ref="animate" onAnimationEnd={(e)=>{ this.gameOver();}} />
      <h3>{question_name}</h3>
      <ul>
        {
          items && items.map((item ,i)=>{
          return (<li  className={temp[i]} onChange={(e)=>{ this.record(e);}}><label><input type="radio" checked={false}/>{temp[i]}、{item}</label></li>)
          })
        }
      </ul>
      <Alert show={this.state.show} msg={this.state.msg}/>
    </div>
    )
  }
}
