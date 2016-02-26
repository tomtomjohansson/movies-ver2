var express = require('express');
var fs = require('fs');

// Collects data from file filmer.json. Passes along the JSON-object in a callback-function.
function getStream(callback){
   var data = "";
   var json="";
   var fileReadStream = fs.createReadStream('filmer.json');
   fileReadStream.on('data', (text) => {
      data += text;
      json = JSON.parse(data);
      callback(json);
   });
}

module.exports.getStream = getStream;
