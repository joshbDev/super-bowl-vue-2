var fs = require('fs');
var http = require('http');
var path = require('path');

var express = require('express');
var app = express();

app.use('/*/**', function(req, res) {
var url = req['_parsedUrl'].path;
res.sendFile(path.join(__dirname + '/../' + url.replace('%20', ' ') + (url.split('.')[1] ? '' : '.jpg')));
});
app.use('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/../index.html'));
});
var httpServer = http.createServer(app);

httpServer.listen(7000, '0.0.0.0', undefined, function () {
  console.log('APP RUNNING ON PORT 7000');
});
