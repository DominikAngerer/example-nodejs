var express = require('express');
var http = require('http');
var circle = require('./circle.js');
var app = express();

app.get('/', function(req, res){
  res.send('Die ALM alm - mit Tieren und Aliens :)\n');
});

//Additional app.get, app.post, app.put, app.delete stuff would be here
app.get('/circle/area', function(req, res){
 	res.send('The area of a circle of radius ' + req.query.radius + ' is : ' + circle.area(req.query.radius));
});
app.get('/circle/circumference', function(req, res){
 	res.send('The circumference of a circle of radius ' + req.query.radius + ' is : ' + circle.circumference(req.query.radius));
});

http.createServer(app).listen(9999, function() {
    console.log('Listening on port 9999');
});
