// import mongoose from 'mongoose'

// let promise = mongoose.connect('mongodb://120.55.98.137:27017/NBbrain',{
//     userMongoClient: true
// });
// // promise.then(function(db){

// // })
// let db = mongoose.connection;
// db.on('connected', function(){
//     console.log('connected!!!');
// });
// db.on('error', function(err){
//     console.log('连接失败',err);
// });
// db.once('open', function(){
//     console.log('连接成功')
// },function(err){
//     console.log(err);
// });

// const pinyin = new mongoose.Schema({
//   unicode: {type: String, required: true},
//   pinyin: String,
//   zi: String
// })
// var pinyinModel = mongoose.model('pinyins', pinyin);
var fs = require('fs');
var iconv = require('iconv-lite');
var FIRST_PINYIN_UNIHAN = 19968;
var LAST_PINYIN_UNIHAN = 40959;
var arr = [];
for(let i = FIRST_PINYIN_UNIHAN; i <= LAST_PINYIN_UNIHAN; i++) {
  arr.push(String.fromCharCode(i))
}
// [āáǎàēéěèīíǐìōóǒòūúǔùǚǜǘǜ]
var COLLATOR = new Intl.Collator(['zh-Hans-CN'])
arr.sort(COLLATOR.compare)
fs.writeFileSync('./hanzi.json', JSON.stringify(
  arr.map(function(v, i){
    return {
      hanzi: v,
      unicode: `\\u${v.charCodeAt(0).toString(16)}`,
      index: i
    }
  }),
  null,
  '  '
))


// fs.readFile('./pinyin.txt','binary', function(err, data){
//   var text = iconv.decode(data,'Unicode')
//   console.log(text);
// })
// pinyinModel.create()
