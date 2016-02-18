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
      var id = 0;
      // Collects querystring passed on from list.jade and passes it to the id-variable. Req.query.id equals the index of the movie to be shown. Defaults to zero if no query-string exists. Also defaults to zero if id in query-string is higher than the maximum-value of the movie-array.
      if (req.query.id > 0 && req.query.id < data.movies.length) {
         id = req.query.id;
      }
      else {
         id = 0;
      }
      // movie value points to specified movie from array with help from the id-variable.
      res.render('movies', {
         title: 'Movie',
         movie: data.movies[id]
      });
   }
});

module.exports = router;
