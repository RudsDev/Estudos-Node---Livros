var http = require('http');

http.createServer(function(req, res){
	res.writeHead(200,{'Content-Type':'plain/text'});
	res.end('Verify terminal.');
	console.log(global);
}).listen(8124);

console.log('Server running at http://localhost:8124');