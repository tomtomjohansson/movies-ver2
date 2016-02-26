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
      // Picks out selected genre from query-string and assigns it to variable genre.
      var genre = req.query.genre;
      var movies = data.movies;
      // Filter through all movies. If genre is true (i.e. a query-string exists) return the movies where the genre from the query-string has an index in the genre-array (or genre-string if only one). If typeof genre is undefined return all movies.
      var filtered = movies.filter(function(x){
         if (genre){
            return x.genre.indexOf(genre) >= 0;
         }
         else{
            return x;
         }
      });
      var numberOfMovies = "";
      // Show how many movies there are in list. If genre is undefined, show how many total.
      if(genre && filtered.length < 2){
         numberOfMovies = "There is "+filtered.length+" movie in this genre.";
      }
      else if(genre){
         numberOfMovies = "There are "+filtered.length+" movies in this genre.";
      }
      else{
         numberOfMovies = "There are "+filtered.length+" movies total.";
      }
      res.render('list', {
         title: 'List movies',
         movies: filtered,
         numMovies: numberOfMovies
      });
   }
});

module.exports = router;
