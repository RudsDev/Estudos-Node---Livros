var App = () =>{

  const middlewares = [];
  
  const use = cb => middlewares.push(cb);

  const _runMids = ()=>{
    middlewares.forEach(cb => cb());
  }
  
  
  const get = ()=>{
    _runMids();
    console.log('Run get')
  }
  return {get, use};
}

const app = App();

const md1 = ()=>setTimeout(()=>console.log('MDW-1'),1000);
const md2 = ()=>setTimeout(()=>console.log('MDW-2'),2000);
const md3 = ()=>setTimeout(()=>console.log('MDW-3'),3000);

app.use(md1);
app.use(md2);
app.use(md3);

app.get();