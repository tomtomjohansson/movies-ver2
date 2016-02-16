var express = require('express');
var router = express.Router();
var fs = require('fs');

// var data = "";
// var fileReadStream = fs.createReadStream('movies.txt');
// fileReadStream.on('data', (text) => {
//    data += '{"movies":[';
//    data += text;
//    data += ']}';
//    var json = JSON.parse(data);
//    writeOnPage(json);
// });

// function writeOnPage(data){
router.get('/', function(req, res, next) {
   var data = "";
   var json="";
   var fileReadStream = fs.createReadStream('movies.txt');
   fileReadStream.on('data', (text) => {
      data += '{"movies":[';
      data += text;
      data += ']}';
      json = JSON.parse(data);
      writeOnPage(json)
   });
   function writeOnPage(data){
      res.render('index', {
         title: 'Express',
         movies: data
      });
   }
});
// }


module.exports = router;
