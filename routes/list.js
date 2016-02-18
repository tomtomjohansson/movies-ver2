var express = require('express');
var router = express.Router();
var fs = require('fs');
var stream = require('./stream');

router.get('/', function(req, res, next) {
   stream.getStream(writeOnPage);
   function writeOnPage(data){
      res.render('list', {
         title: 'List movies',
         movies: data
      });
   }
});

module.exports = router;
