var http = require('http');
var fs = require('fs');

http.createServer(function(req, res){

	var name = require('url').parse(req.url, true).query.name;

	if(name==undefined) name = 'world';

	if(name=='burningbird'){

		var file = 'phoenix5a.png';

		fs.stat(file, function(err, stat){

			if(err){
				console.log(err);
				res.writeHead(200, {'Content-Type':'text/plain'});
				res.end('Sorry, Burningbird is not around right now...\n');
			}
			else{
				var img = fs.readFileSync(file);
				res.contentType = 'image/png';
				res.contentLenght = stat.size();
				res.end(img, 'binary');
			}
		});
	}
	else{
		res.writeHead(200, {'Content-Type':'text/plain'});
		res.end('Hello '+ name + '\n');
	}

}).listen(8125);

console.log('Server Running at http://localhost:8125/');
