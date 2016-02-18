var express = require('express');
var router = express.Router();
var fs = require('fs');
var stream = require('./stream');

router.get('/', function(req, res, next) {
   stream.getStream(writeOnPage);
   function writeOnPage(data){
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
