var App = () =>{

  const middlewares = [];
  
  const use = cb => middlewares.push(cb);

  const _runMids = index=>{
    if(index<middlewares.length){
      console.log(index);
      middlewares[index].call(null,()=>_runMids(++index));
    }
    //middlewares.forEach(cb => cb.call(null,()=>_runMids(index++)));
  }
  
  
  const get = ()=>{
    console.log(middlewares);
    _runMids(0);
    console.log('Run get')
  }
  return {get, use};
}

const app = App();

const md0 = next=>setTimeout(()=>{console.log('MDW-0');next()},1000);
const md1 = next=>setTimeout(()=>{console.log('MDW-1');next()},2000);
const md2 = next=>setTimeout(()=>{console.log('MDW-2');next()},3000);

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