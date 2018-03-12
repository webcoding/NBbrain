import config from './config';
import utils from './common/utils';
import cData from './data';
export default function addQbank(){
  let fn = utils.promisify(utils.ajax);
  let url = `${config.env}/updateQbank`
  let data = {
    total_question: 30,
    complish_statue: 3,
    qbank_name: "生活类",
    time: "300",
    user_id: "eaz_sn1b"
  }
  let promise = fn('post', url, data);
  promise.then((result)=>{
    console.log(result)
  })
  // for(let j=0; j<30; j++){
  //   let promise1 = fn('post',`${config.env}/updateQuestion`,cData[j]);
  // }
}
