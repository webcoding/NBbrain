var request = require('request');
var iconv = require('iconv-lite');
var fs = require('fs');
for(var i=1; i<=130; i++){
  var req = request({
    method: 'GET',
    url: `http://chengyu.98523.com/Index.asp?Page=${i}&Sort1=&Sort2=`,
    encoding:null
  },function(err, response, body){
      var arr = [];
      var text = (iconv.decode(body,'gb2312')).toString();
      text.replace(/jieshi\/([\u4e00-\u9fff\，]*)/g, function(all, p1){
        arr.push(p1);
        return "";
      });
      var txt = arr.join(',');
      fs.writeFile(`./test.txt`,txt,{
        flag: "a+",
        encoding: "utf8"
      }, function(err, data){
        console.log(data);
      })
    })
}
