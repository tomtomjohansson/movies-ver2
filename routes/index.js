var express = require('express');
var router = express.Router();
var fs = require('fs');

// Renders title to index-page
router.get('/', function(req, res, next) {
   res.render('index', {
      title: 'Add movies',
   });
});

module.exports = router;
