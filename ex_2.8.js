/*
 >> Callbacks aninhados e tratamento de exceções [pt-1]

    Em JS é muito comum encontrar situações em que funções são chamadas uma após a outra,
e cada uma dessas funções receba o resultado da função imediatamente anterior (a que originou sua 
chamada) e passem seus resultados para a próxima função a ser invocada. Se todas as funções desse
contexto forem síncronas serão executadas dentro da ordem em que foram chamadas, sem surpresas. 
    Exemplo: 

        val1 = callFunction();
        val2 = callFunction(val1);
        val3 = callFunction(val2);


    O exemplo 2.8 usa versões síncronas dos métodos do módulo File System (fs) do Node para 
abrir um arquivo e substituir as ocorrências da palavra "apple" pela palavra "orange" e 
gravar as strings resultantes em um novo arquivo. 
    Como não há a certeza de que possíveis erros serão tratados pelo módulo File System
envolvemos o código em um bloco try/catch. Note que o uso do try/cacth só é possível pois 
não estamos utilizando funções assíncronas no código.
    Ao se converter um código sequencial síncrono para assíncrono temos que ter em mente que
funções assíncronas não bloqueiam o processamento quando são chamadas, sendo assim, não é possível
nos certificar da sequência em que serão executadas pois elas são chamadas de forma independente
uma das outras. O único modo de assegurar que elas sejam executadas na sequência correta é 
usando nested callbacks.

*/

//Exemplo 2.8 [PG-69] Uma aplicação sequencial assíncrona
var fs  = require('fs');

try {
    var data  = fs.readFileSync('./apples.txt','utf8');
    console.log(data);
    var adjData = data.replace(/[A|a]plle/g,'oragne');
    fs.writeFileSync('./oranges.txt', adjData);
}
catch(err){
    console.error(err);
}