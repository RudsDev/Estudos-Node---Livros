//Exemplo 5.2 [PG-146] Cliente enviando POST request.


var http = require('http');
var querystring = require('querystring');

var postData  = querystring.stringify({'msg':'Hello server!'});

var options = {
    hostname: 'localhost',
    port: 8124,
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': postData.length
    }
};

var req = http.request(options, function (res) {  
    
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');

    res.on('data', function (chunck) {  
        console.log('BODY: ' + chunck);
    });

    res.on('end', function () {  
        console.log('No more data in response');
    });
});

req.on('error', function (e) {  
    console.log('An error as ocurred: ' + e.message);
    console.log('Stack trace: ' + e.stack);
})

//Grava dados no corpo da solicitação
req.write(postData);
req.end();