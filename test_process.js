process.stdin.setEncoding('utf8');

process.stdin.on('readable',function(){
	
	var input = process.stdin.read();

	if(input!==null){
		process.stdout.write(input);
	}	

});
var http = require('http');

http.createServer(function(req, res){
	res.writeHead(200,{'Content-Type':'plain/text'});
	res.end('Verify terminal.');
	console.log(process);
}).listen(8125);

console.log('Server running at http://localhost:8125');
