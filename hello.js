var http = require('http');

http.createServer(function (req, res) {
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.end('Hello World!!!!!\n');
}).listen(8124);

console.log('Server Runnidng at http://localhost:8124/');
