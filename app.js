var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var routes = require('./routes/index');
var list = require('./routes/list');
var movies = require('./routes/movies');
var stream = require('./routes/stream');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/list', list);
app.use('/movies', movies);


// New Code here
// Post for form on route:'/'
// Pushes the request body to our movie array. Overwrites object in JSON-file.
// Redirects to '/list'
app.post('/moviepost', function(req,res,next) {
   console.log(req.body);
   var newMovie = req.body;
   stream.getStream(overWrite);
   function overWrite(data){
      var arr = data.movies;
      newMovie.id = arr[arr.length-1].id + 1;
      arr.push(newMovie);
      fs.writeFile('filmer.json', JSON.stringify(data),function(error){
         if(error){
            return console.log(error);
         }
      });
   }
   res.writeHead(302,{'Location':'/list'});
   // res.redirect('/list');
   res.end();
});

// Delete movie. Gets id from query-string. Collects json-object from stream.js. Lopps through array of movies and returns the index of the movie with the same id as the one in the query-string. Uses that index to splice in the array. Writes new JSON-object to filmer.json. Then redirects back to /list.
app.get('/delete', function(req,res,next) {
   var getId = req.query.id;
   stream.getStream(deleteMovie);
   function deleteMovie(data){
      var arr = data.movies;
      var remove = arr.findIndex(function(x){
         return x.id == getId;
      });
      arr.splice(remove,1);
      fs.writeFile('filmer.json', JSON.stringify(data),function(error){
         if(error){
            return console.log(error);
         }
      });
   }
   res.writeHead(302,{'Location':'/list'});
   res.end();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
