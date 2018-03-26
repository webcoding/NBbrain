const mongoose = require('mongodb').MongoClient;
const data = require('./data.js');
mongoose.connect('mongodb://120.55.98.137:27017',function(err, client){
  const db = client.db('NBbrain');
  add(db, data);
  client.close();
});
let default_data = {
  total_question: 10,
  complish_statue: 4,
  create_time: new Date(),
  update_time: new Date(),
  qbank_name: '生活',
  time: 60,
  user_id: 'g0zd8os9'
}
async function add(db, data){
  const qbanks = db.collection('qbanks');
  let index = 0;
  let current_data;
  const len = data.default.length;
  // for(let i=0; i < len; i += 10){
    // index = i + 9 > len ? len : i + 9;
    current_data = data.default.slice(30);
    current_data.map(function(item){
      item.question_id = createRandom();
      return item;
    })
    default_data.questions = current_data;
    default_data.qbank_id = createRandom();
    await qbanks.insertOne(default_data, function(err, result){
      console.log(result);
    })
  // }
}

function createRandom(){
  var temp = 'abcdefghigklmnopqrstuvwsyz0123456789_';
  return String(Math.random()).match(/(\d{2})/g).slice(0,20).map(function(d){
      return temp.charAt(d*temp.length/100);
  }).join('');
}
