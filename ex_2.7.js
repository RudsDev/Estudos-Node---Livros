/*
 >> EventEmitter em objetos preexistentes

    "No mundo real, precisamos da funcionalidade de EventEmitter em nossos objetos
    preexistentes, em vez de usar instâncias de EventEmitter ao longo da aplicação 
    (Como foi feito no exemplo 2.6). É isso que fazem o http.Server e muitas outras
    classes do Node que compreendem eventos."


    A funcionalidade de EventEmitter é herdada, para ativar a herança no Node
usamos outro objeto, o Util. Importa-se o módulo Util usando "require('util')".
    A função util.inherits() permite herdar os métodos do prototype de um construtor para
outro. Usando util.inherits() com um objeto, fazendo com que ele herde os método do
prototype de EventEmitter, podemos chamar o método emit dentro dos métodos desse objeto
e definir event handlers dentro das instâncias desse objeto.
    Segue exemplo:

        var util = require('util');

        //Usando util.inherits() no objeto "SomeObj".
        util.inherits(SomeObj, EventEmitter);
        
        //Chamando o método emit() dentro da função someMethod() do objeto SomeObj.
        SomeObj.prototype.someMethod = function(){this.emit('event');};
        
        ...

        //Definindo um event handler dentro de uma instância de SomeObj.
        SomeObjInstance.on('event', function(){console.log('Evento disparado.')})


        **OBS: Nesse exemplo esta sendo utilizado o ES5. As "classes" então estão sendo
        criadas no estilo ES5. O objeto SomeObj seria o equivalente
        a uma classe em ES6 e SomeObjInstance uma instância dessa classe.


    O exemplo 2.7 mostra uma classe herdando a funcionalidade de EventEmitter. Nesse exemplo é
criada uma classe chamada InputChecker. O construtor dessa classe pede dois argumentos, o nome
de uma pessoa e um arquivo. 
    A classe InputChecker também tem um método chamado "check" que verificará os comandos que 
foram digitados(wr:, en:, null(nenhum)). A instância do objeto cria event handlers para as os
três eventos possiveis, a saber: gravar dados no arquivo(wr:), encerrar aplicação(en:), exibir
dados(null).


**OBS: A função on() é na verdade um atalho para a função EventEmitter.addListener(), que
recebe os mesmos parâmetros.


    Por padrão o Node permite que utilizemos um máximo de dez listeners para um mesmo evento,
ao ultrapassar esse limite um alerta é emitido. Para aumentar esse limite usa-se a função
setMaxListeners(), passando como parâmetro a quantidade máxima desejada, contudo, passando
o valor zero(0) para essa função estamos dizendo que não há limites de listeners utilizados em
um mesmo evento.


    Caso se deseje remover algum listeners utiliza-se a função EventEmitter.removeListener().
        ex:
            obj.on('nomeEvento', callback);
            obj.removeListener('nomeEvento', callback);

    Fazendo isso removemos um dos listeners existentes no array de listeners, mantendo a 
ordem. Se por algum motivo o array de listeners de eventos foi copiado através da função
EventEmitter.listeners(), será necessário recriar essa cópia após a remoção de um lisneter.        


*/

"use strict";

var util  = require('util');
var eventEmitter = require('events').EventEmitter;
var fs = require('fs');

function InputChecker(name, file) {
    this.name = name;
    this.writeStream = fs.createWriteStream('./'+file+'.txt',
    {'flags':'a',
     'encoding':'utf8',
     'mode':'0o666',
    });
};

/*Usando util.inherits() no classe InputChecker. As instâncias dessa classe poderão chamar o 
método emit() e definir event handlers.*/
util.inherits(InputChecker, eventEmitter);



/*Pode se observar o método emit sendo utilizado após ser herdado via util.inherits(). */
InputChecker.prototype.check = function check(input) {

    //elimina excesso de espaços em branco
    let command  = input.trim().substr(0,3);

    //processa os possíveis comandos
    // se for wr: grava os dados no arquivo
    if(command=='wr:'){
        this.emit('write', input.substr(3, input.length));
    }
    //se for en: encerra o processo
    else if(command=='en:'){
        this.emit('end');
    }
    // ecoa a entrada na saída padrão caso não haja comandos
    else{
        this.emit('echo', input);
    }
    
};


//testa o novo objeto e o tratamento de eventos
let ic = new InputChecker('Shelley','output');

ic.on('write', function(data){
    this.writeStream.write(data,'utf8');
});

ic.on('echo', function(data){
    process.stdout.write(ic.name + 'wrote' + data);
});

ic.on('end', function(){
    process.exit();
});


// captura a entrada depois de definir a codificação de texto
process.stdin. setEncoding('utf8');
process.stdin.on('readable', function(){
    let input = process.stdin.read();
    if(input!==null)
        ic.check(input);
});    