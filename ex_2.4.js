/*
 >> Gerenciamento de callbacks e eventos assíncronos no Node

	O JS é single-threaded. O que siginifica que ele é executado linha por linha até
o final da aplicação. Por ser baseado em JS, o Node herda esse comportamento 
síncrono de uma única thread.
	Se for necessário  que alguma funcionalidade espere que algo aconteça, uma 
abertura de arquivo por exemplo, a aplicação ficará bloqueada até que tal operação 
termine de ser processada. A solução para evitar esse tipo de bloqueio é o event loop.


>> Event loop

	O Node (e também o JS que roda nos navegadores) adota uma arquitetura baseada 
em eventos para oferecer a funcionalidade assíncrona. Quando um processo que consome
tempo é invocado a aplicação não espera que ele termine, ao invés disso o processo 
avisa quanto estiver sido concluído através de um sinal de evento. Esse evento é 
adicionado  à fila de eventos (event loop). 
	Qualquer funcionalidade que tenha interesse em determinado evento registra seu
interesse nele e quando o mesmo é retirado do event loop e processado a 
funcionalidade dependente (que registrou seu interesse no evento) é chamada e os 
dados relacionados ao evento são passados a ela. Uma analogia simples seria a 
situação em que um usuário do Facebook diz que tem interesse em determinado evento 
postado na plataforma e passa a receber notificações sobre ele.
	O Node tem seu próprio laço de eventos, esse laço é utilizado para facilitar
funcionalidades de servidor, em sua maioria de entrada e saída(I/O), como por exemplo,
eventos de aberturas de arquivos e solicitações web vindas de um usuário ou até mesmo 
de outro sistema. Esses tipos de processo consomem uma grande quantidade de recursos 
além de consumir bastante tempo de processamento. O acesso a um recurso geralmente o 
bloqueia impedindo que outros processos o acesse até que o processo original 
(o primeiro que acessou o recurso) tenha sido finalizado. Aplicações web são 
especialmente afetadas por esse tipo de comportamento pois dependem da iteração de 
usuários ou de outros sistemas, o que gera uma maior aleatoriedade de acesso a 
determinados recursos.


	"O Node processa todos os eventos da fila em ordem. Quando chegar ao evento
	em que você esta interessado, chama a função de callback informada e passa
	a ela qualquer informação associada ao evento."


	O exemplo 2.4 tem por finalidade mostrar como é feito o "registro" em eventos
e como eles são executados.

	Ao iniciar a aplicação, imediatamente é exibida pelo ultimo console.log() a
mensagem "Server Running at http://localhost:8124". Isso acontece pois a aplicação
não fica bloqueada quando o servidor é criado, ou quando um cliente se conecta, ou
mesmo quando as requisições começam a ser monitoradas. A prioridade de execução é
das funcionalidades não blocantes.
	A próxima mensagem exibida é "Listen event". Assim que o servidor é criado 
começamos a monitorar a entrada de novas conexões e solicitações. Isso é feito ao
se chamar server.listen(). Não é necessário esperar por nenhum evento avisando que
o servidor terminou de ser criado pois a função http.crateServer() devolve o
controle para a aplicação principal (a que chamou http.crateServer()).
	Nenhuma outra mensagem é mostrada até que um cliente se conecte a aplicação.
	Quando um cliente se conecta a mensagem "Connection event" é exibida, pois a 
conexão é o primeiro evento disparado pelo acesso de um novo cliente. Após isso
há a aparição da mensagem "Request event".
	Ao recarregar a página no mesmo navegador apenas as mensagem relativas ao
evento de request serão exibidas. A conexão ja esta estabelecida e é mantida até
que o navegador seja fechado ou ocorra algum timeout.

*/

//Exemplo 2.4 [PG-55] Servidor web básico com destaque para alguns eventos
var http = require('http');
var server  = http.createServer();

//Registrando interesse no evento 'request' através da função on().
server.on('request', function(req,res){	
	console.log('Request event');
	res.writeHead(200,{'Content-Type':'text/plain'});
	res.end('Hello World\n');
});

//Registrando interesse no evento 'connection' através da função on().
server.on('connection', function(){
	console.log('Connection event');
});

//Registrando interesse no evento 'listen' através da função listen().
server.listen(8124,function(){
	console.log('Listen event');
});

//funcionalidade "não blocante".
console.log('Server Running at http://localhost:8124');