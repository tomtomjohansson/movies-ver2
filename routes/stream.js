var express = require('express');
var fs = require('fs');

// Collects data from file movies.txt. Transforms it into a JSON object. Passes along the JSON-object in a callback-function.
function getStream(callback){
   var data = "";
   var json="";
   var fileReadStream = fs.createReadStream('movies.txt');
   fileReadStream.on('data', (text) => {
      data += '{"movies":[';
      data += text;
      data += ']}';
      json = JSON.parse(data);
      callback(json);
   });
}

module.exports.getStream = getStream;
