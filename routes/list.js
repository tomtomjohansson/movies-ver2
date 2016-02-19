var express = require('express');
var router = express.Router();
var fs = require('fs');
// Requires module for fetching data from database-file
var stream = require('./stream');

router.get('/', function(req, res, next) {
   // Calls function in file stream.js. Passes function writeOnPage as a callback to collect data from database-file.
   stream.getStream(writeOnPage);
   // Function to render to jade-page. Passes a JSON-object as a parameter.
   function writeOnPage(data){
      res.render('list', {
         title: 'List movies',
         movies: data
      });
   }
});

module.exports = router;
