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

      console.log(req.method);
      console.log(req.url);
      console.log(req.query);

      var id = 0;

      if (req.query.id > 0 && req.query.id < data.movies.length) {

         id = req.query.id;

      }

      else {

         id = 0;

      }

      res.render('movies', {
         title: 'Movie',
         movie: data.movies[id]
      });
   }
});

module.exports = router;
