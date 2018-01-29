/*
 >> EventEmitter

	O EventEmitter permite tratar eventos assíncronos no Node.
	Toda vez que um objeto emite um evento usando a keyword "emit" e logo depois um evento
é tratado pela função "on" presenciamos o EventEmitter trabalhando. Entender o funcionamento 
e a utilização do EventEmitter é extremamente importante para se trabalhar de forma correta
com o Node.

	Uma aplicação de teste bem simples:

		//Primeiro, incluindo o módulo events
		var events = require('events');

		//Criando uma instância de EventEmitter
		var emitter  = new events.EventEmitter();

	O EventEmitter que foi criado será utilizado para executar duas tarefas essenciais: anexar
um event handler a um evento e depois emitir o evento propriamente dito. O primeiro argumento
é o nome do evento e o segundo a função de callback que executará alguma funcionalidade:

	emitter.on('someevent', function(data){console.log("Evento disparado.")});

	O evento será emitido no objeto através do método EventEmitter.emit() quando alguma
condição for satisfeita:

	if(somecriteria){
		en.emit('data');
	}



	No exemplo 2.6 foi criada uma intância de EventEmitter que emite um eento temporizado
a cada três segundos. O principal ponto a se observar é que um evento é disparado pela 
função emitter.emit() e capturado e processado por emitter.on().

*/






//Exemplo 2.6 [PG-61] Teste simples usando EventEmiiter
var eventEmitter  = require('events').EventEmitter;


var count = 0;
var emitter = new eventEmitter();

//Emitindo evento temporizado a cada 3 segundos
setInterval(function(){emitter.emit('eventoTemporizado',count++)},3000);


//Capturando e processando o evento
emitter.on('eventoTemporizado', 

	//Event handler do evento 'eventoTemporizado'
	function(data){

		/*Oberse a relação entre o argumento "count" que foi definido em emitter.emit
		e o objeto "data" recebido como parâmetro pelo event handler. */
		console.log('eventoTemporizado - ' +  data);
	}
);