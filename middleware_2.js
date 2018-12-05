var fib  = function(n){
	if(n<2) return n;
	return fib(n-1) + fib(n-2);
};

var App = () =>{

  const middlewares = [];
  
  const use = cb => middlewares.push(cb);

  const _runMids = index=>{
    if(index<middlewares.length){
      middlewares[index].call(null,()=>_runMids(++index));
    }
  }
  
  
  const get = ()=>{
    _runMids(0);
    console.log('Run get')
  }
  return {get, use};
}

const app = App();

const md0 = next=>{console.log(`Fibbonaci de ${30} = ${fib(30)}`);next()};
const md1 = next=>{console.log(`Fibbonaci de ${35} = ${fib(35)}`);next()};
const md2 = next=>{console.log(`Fibbonaci de ${40} = ${fib(40)}`);next()};

const md3 = next=>{console.log('MDW-3');next()};
const md4 = next=>{console.log('MDW-4');next()};
const md5 = next=>{console.log('MDW-5');next()};

app.use(md0);
app.use(md1);
app.use(md2);
app.use(md3);
app.use(md4);
app.use(md5);

app.get();