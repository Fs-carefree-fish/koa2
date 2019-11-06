//处理参数
function parsePostData(ctx) {
  return new Promise((resolve, reject) => {
    try {
      let postData = ""
      ctx.req.on('data', (data) => {
        postData += data
      })
      ctx.req.addListener('end', function () {

        //这里是返回字符串
        // userName=zz&age=18&webSite=zz.com
        //resolve(postData)


        // 处理字符串为json
        let parseData = parseQueryStr(postData)
        resolve(parseData)
      })

    } catch (error) {
      reject(error)
    }
  })
}

//处理成json
function parseQueryStr(str) {
  let queryData = {}
  let queryStrList = str.split('&')
  for (let [idx, str] of queryStrList.entries()) {
    let itemList = str.split("=")
    console.log(itemList);
    queryData[itemList[0]] = decodeURIComponent(itemList[1]);
  }
  return queryData
}





//处理请求
const Koa = require('koa');
const app = new Koa();
app.use(async (ctx) => {
  //当请求时GET请求时，显示表单让用户填写
  if (ctx.url === '/' && ctx.method === 'GET') {
    let html = `
            <h1>Koa2 request post demo</h1>
            <form method="POST"  action="/">
                <p>userName</p>
                <input name="userName" /> <br/>
                <p>age</p>
                <input name="age" /> <br/>
                <p>webSite</p>
                <input name='webSite' /><br/>
                <button type="submit">submit</button>
            </form>
        `;
    ctx.body = html;
    //当请求时POST请求时
  } else if (ctx.url === '/' && ctx.method === 'POST') {

    // ctx.body='接收到请求';

    let pastData = await parsePostData(ctx);
    ctx.body = pastData;



  } else {
    //其它请求显示404页面
    ctx.body = '<h1>404!</h1>';
  }
})

app.listen(3000, () => {
  console.log('[demo] server is starting at port 3000');
})