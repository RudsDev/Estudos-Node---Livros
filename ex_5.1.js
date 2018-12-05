//Exemplo 5.1 [PG-145] Server que recebe um POST e processa dados recebidos.

var http = require('http');
var querystring = require('querystring');

var server = http.createServer().listen('8124');

server.on('request', function (request, response) {  
    
    if(request.method=='POST') {
        
        console.log('POST');

        var body = '';

        //Adciona data chunks ao final do corpo da página.
        request.on('data', function (data) {  
            body += data;
        });

        //transmite daddos
        request.on('end', function () {  
            var post = querystring.parse(body);
            console.log(post);
            response.writeHead(200,{'Content-Type':'text/plain'});
            response.end('Hello Client\n');
        });
    }
});


server.on('error', function (e) {  
    console.log('An error as ocurred: ' + e.message);
});

server.on('connection', function(){
	console.log('Connection event');
});

server.listen(8124,function(){
	console.log('Listen event');
});

console.log('Server listening on 8124');

