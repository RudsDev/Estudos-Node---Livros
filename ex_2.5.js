/*
 >> Criando uma função assíncrona de callback

	O exemplo 2.5 tem por finalidade mostrar a estrutura fundamental da funcionalidade de
callback.

	A primeira funcionalidade chave é [garantir que o último argumento seja uma função de 
callback - 1] e que [o primeiro argumento da função de callback seja um erro - 2].
	A segunda funcionalidade chave é a [criação de um objeto error adicional no Node e a 
sua devolução  como resposta à função de callback - 3]. Não é possível utilizar throw-catch pois
estamos trabalhanco com assíncronismo, logo o tratamento de erros tem que ser realizado no
objeto Error do callback.
	A última funcionalidade chave é a [chamada a função de callback, passando para ela os dados
da função chamadora caso nenhum erro ocorra - 4]. Para garantir o assincronismo dessa callback
a chamamos dentro de uma função process.nextTick().

		"A função process.nextTick() garante que o laço de eventos (event loop) seja esvaziado
		antes que a função seja chamada. Isso significa que todas as funcionalidades síncronas
		são processadoas antes que a funcionalidade brocante(caso exista) seja chamada."

	A função de Fibonacci pode ocupar muito tempo de processamento dependendo do valor passado
para ela. Chamando a função de Fibonacci dentro de process.nextTick() garantimos que a 
funcionalidade brocante (pois consome muito recursos de CPU) seja tratada de forma assíncrona.

	Em suma, as 4 funcionalidades chaves para a criação de uma função callback assíncrona são: 

		1 - Carantir que o último argumento seja uma função de callback.
		
		2 - Criar um objeto Error no Node e, se um erro ocorrer devolver esse objeto como
		primeiro argumento da função de callback.

		3 - Caso não ocorram erros, chamar a função de callback, passando null no lugar do
		objeto de erro e passando para o callback qualquer dado relevante.

		4 - A função de callback deve ser chamada de dentro de process.nextTick() garantindo
		assim que não haja bloqueio.
	




*/

//Exemplo 2.5 [PG-58] Estrutura fundamental da funcionalidade de callback
var fib  = function(n){
	if(n<2) return n;
	return fib(n-1) + fib(n-2);
};

var Obj = function(){};

Obj.prototype.doSomething = function(arg1_){
	
	/*1 - Garantindo que o último argumento passado seja uma função de callback. */
	var callback_ = arguments[arguments.length-1];	
	callback = (typeof(callback_)=='function'?callback_:null);


	var arg1 = (typeof arg1_ == 'number'?arg1_:null);
	
	/*3 criação de um objeto error adicional no Node e a sua devolução  como resposta à
	função de callback */
	if(!arg1_)
		return callback(new Error('First arg missing or NaN'));
	
	process.nextTick(function(){
		//block cpu
		var data = fib(arg1);
		/*4 chamada a função de callback, passando para ela os dados da função chamadora
		caso nenhum erro ocorra */
		callback(null, data);
	});
};

var test = new Obj();
var number = 20;

/*2 Garantindo que o primeiro argumento da função de callback seja um erro */
test.doSomething(number, function(err, value){
	
	if(err)
		console.log(err);
	else
		console.log('Fibonaci value for %d is %d', number, value);
});

console.log('Called doSomething!');
