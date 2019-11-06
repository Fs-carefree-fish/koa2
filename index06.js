const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();

// const router = new Router();




//2============添加层级

let home = new Router();
home.get('/jspang',async(ctx)=>{
    ctx.body="Home JSPang";
}).get('/todo',async(ctx)=>{
    ctx.body ='Home ToDo';
})
 
 
 
 
let page = new Router();
page.get('/jspang',async(ctx)=>{
    ctx.body="Page JSPang";
}).get('/todo',async(ctx)=>{
    ctx.body ='Page ToDo';
})
 
//装载所有子路由
let router = new Router();
router.use('/home',home.routes(),home.allowedMethods());
router.use('/page',page.routes(),page.allowedMethods());
 



//1============添加层级
// const router = new Router({
//   prefix:'/jspang'
// })


// router.get('/', function (ctx, next) {
//   ctx.body = "Hello JSPang";
// })
//   .get('/todo', function (ctx, next) {
//     ctx.body = "Todo"
//   });


 
//加载路由中间件
app
  .use(router.routes())
  .use(router.allowedMethods());



app.listen(3000, () => {
  console.log('starting at port 3000');
});