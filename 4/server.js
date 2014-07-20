/**** IMPORT ALL THE THINGS ****/
var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');

/**** CONFIGURE ALL THE THINGS ****/
app.all('/*', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
	next();
});
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/**** HELLO WORLD ****/
app.get('/', function(req, res){
	res.send('Die ALM alm - mit Tieren und Aliens :)');
});

/**** LOAD ALL THE CONTROLLERS ****/
fs.readdirSync('./controllers').forEach(function (file) {
  if(file.substr(-3) == '.js') {
      route = require('./controllers/' + file);
      route.controller(app);
  }
});

/**** START THE SERVER ****/
http.createServer(app).listen(9999, function(){
  console.log('NodeJS/Express server listening on port ' + 9999);
});