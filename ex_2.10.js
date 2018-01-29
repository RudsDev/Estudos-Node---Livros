/*
 >> Callbacks aninhados e tratamento de exceções [pt-3]

    Um problema evidente que surge ao se trabalhar com nested callback é o aumento de
complexidade do código a cada intrudução de mais um nivel de aninhamento.
    
    No exemplo 2.10 uma lista de arquvos de um diretório é acessada, em cada um dos 
arquivos subistituimos o nome de um dominio genérico por um especifico usando a função
replace(), o resultado é gravado no arquivo original e um log que registra cada arquivo 
alterado é mantido. Um problema dessa aplicação é que não é possível verificar o momento
em que todos arquivos terminarma de ser modificados. O método forEach chama os iteradores
nos callbacks de forma assíncrona, sendo assim, não há bloqueio de processamento.


*/

//Exemplo 2.10 [PG-72] Uma aplicação sequencial assíncrona

var fs  = require('fs');

var writeStream  = fs.createWriteStream('./log.txt',{
    'flags':'a',
    'encoding':'utf8',
    'mode':'0666'
});


writeStream.on('open', function() {

    //obtém lista de arquivos
    fs.readdir('./data/', function(err, files) {

        //para cada arquivo
        if (err) {
            console.error(err.message);
        } else {

            files.forEach(function(name) {
                
                //modifica conteudo
                fs.readFile('./data/' + name, 'utf8', function (err,data) {
                    
                    if (err) {
                        console.error(err.message)
                    } else {
                        
                        var adjData = data.replace(/somecompany/.com/g, 'burningbird.net');

                        //grava no arquivo
                        fs.writeFile('./data/'+name, adjData, function(err) {

                            if (err) {
                                console.error(err.message);
                            } else {
                                
                                //grava no log
                                writeStream.write('changed' + name + '\n\n', 'utf8',
                                    function (err) {
                                        if (err) console.error(err.message);
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