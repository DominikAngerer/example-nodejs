
var http = require('http');

http.createServer(function (request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Die ALM alm - mit Tieren und Aliens :)\n');
}).listen(9999);

console.log('Server running at http://127.0.0.1:9999/');
