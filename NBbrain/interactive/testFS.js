let fs = require('fs');
fs.readFile('../upload/IMG_0937.jpg',{flag: 'w+'}, function(err, data){
    console.log(data);
})
