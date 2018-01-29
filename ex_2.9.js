/*
 >> Callbacks aninhados e tratamento de exceções [pt-2]

    O exemplo 2.9 é a conversão do exemplo anterior(2.8) em código assíncrono.
    Note que a estrutura utilizada segue o padrão apresentado no exemplo 2.5.

*/

//Exemplo 2.9 [PG-71] Exemplo 2.8 convertido em código assíncrono usando nested callbacks. 
var fs = require('fs');

/*Abrindo e lendo o arquivo. Somente quando as duas operações forem finalizadas a função de 
callback será chamada.*/
fs.readFileSync('./apples.txt','utf8',function (err, data) {
    
    /*Verifica-se se o objeto err contém algum valor. Caso sim ele será logado na tela e a
    aplicação será encerrada.*/
    if(err)
        console.error(err);

    /*Caso não haja erros a execução segue normalmente.*/    
    else {
        var adjData = data.replace(/apple/g,'orange');

        /*O callback  do método writeFile() recebe apenas um parâmetro. Objeto "err" que 
        guardará possíveis erros que venham a ocorrer.*/
        fs.writeFile('./oranges.txt', adjData, function (err) {

            /*Verificamos se algum erro foi recebido. Qualquer
            coisa diferente de null entrará nessa condicional. */
            if(err) 
                //A propriedade "stack" exibe o stacktrace do erro.
                console.error(err.stack);
        })
    }
});