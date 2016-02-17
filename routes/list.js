var express = require('express');
var router = express.Router();
var fs = require('fs');

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
      res.render('list', {
         title: 'List movies',
         movies: data
      });
   }
});

module.exports = router;
