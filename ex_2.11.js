/*
 >> Callbacks aninhados e tratamento de exceções [pt-4]

    Para evitar que a aplicação se perca caso no diretório que esta sendo processado possua
subdiretórios com arquivos, adcionamos uma verificação utilizando o método fs.stats(), que é
um método assíncrono. Com isso mais um nivel de aninhamento se faz necessário.
    A aplicação cumpre com o seu papel, porém seu código é dificil de se ler e manter, tem uma
baixa manutenibilidade. Claramente é possível detectar uma pyramid of doom.
    Existem módulos que nos ajudam a solucionar o problema gerado por grandes quantidades de 
nested callbacks, como o Async, que será estudado mais a frente.


*/

//Exemplo 2.11 [PG-76] 

var fs  = require('fs');

var writeStream  = fs.createWriteStream('./log.txt',{
    'flags':'a',
    'encoding':'utf8',
    'mode':'0666'
});


writeStream.on('open', function() {
    var counter = 0;

    //obtém lista de arquivos
    fs.readdir('./data/', function(err, files) {

        //para cada arquivo
        if (err) {
            console.error(err.message);
        } else {

            files.forEach(function(name) {
                
                fs.stat('./data/' + name, 'utf8', function (err,stats){
                    
                    if(err) return err;
                    if (!stats.isFile()) {
                        counter++;
                        return;
                    }

                });

                //modifica conteudo
                fs.readFile('./data/' + name, 'utf8', function (err,data) {
                    
                    if(err){
                        console.error(err.message)
                    } else {
                        
                        var adjData = data.replace(/somecompany/.com/g, 'burningbird.net');

                        //grava no arquivo
                        fs.writeFile('./data/'+name, adjData, function(err) {

                            if(err){
                                console.error(err.message);
                            } else {
                                
                                //grava no log
                                writeStream.write('changed' + name + '\n\n', function (err) {
                                    if(err){
                                        console.error(err.message);
                                    } else{
                                        console.log('finished ' + name);
                                        counter++;
                                        if(counter>= files.length){
                                            console.log('all done');
                                        }
                                    }
                                });
                            }
                        });
                    }
                });
            });
        }
    });
});

writeStream.on('error', function(err) {
    console.error('ERROR' + err);
});