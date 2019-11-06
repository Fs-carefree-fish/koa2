// query：返回的是格式化好的参数对象。
// querystring：返回的是请求字符串。
const Koa = require('koa');
const app = new Koa();
app.use(async(ctx)=>{
    let url =ctx.url;
    let request =ctx.request;
    
    let req_query = request.query;
    let req_querystring = request.querystring;
 
    ctx.body={
        url,
        req_query,
        req_querystring
    }
 
});
 
app.listen(3000,()=>{
    console.log('[demo] server is starting at port 3000');
});