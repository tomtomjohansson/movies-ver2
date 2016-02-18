var express = require('express');
var fs = require('fs');

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
