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
      // Collects querystring passed on from list.jade and passes it to the id-variable. Req.query.id equals the id of the movie to be shown. Defaults to zero if no query-string
      var id = req.query.id;
      var arr = data.movies;
      var showMovie = "";
      // If id has a value filter through array of movies and pick out the one with matchin id.
      if (id>=0){
         showMovie = arr.filter(function(movies){
            console.log("Looping "+movies.id+" and id is "+id);
            return movies.id == id;
         });
      }
      // If no query-string exists, set showMovie to entire array. Defaults to first in array in the rendering fase.
      else if (typeof id === 'undefined') {
            showMovie = arr;
      }
      console.log(showMovie);
      res.render('movies', {
         title: 'Movie',
         movie: showMovie[0]
      });
   }
});

module.exports = router;
