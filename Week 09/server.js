let http = require('http');

http.createServer((request,response)=>{
  let body = [];
  request.on('error',err=>{
    console.log(err)
  }).on('data',chunk=>{
    console.log('chunk',chunk)
    body.push(chunk.toString());
    console.log('body1',body)
  }).on('end',()=>{
    body = body.join("");
    console.log('body',body);
    response.writeHead(200,{'Content-Type':'text/html'});
    response.end(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <style>
        html,body{
          height:100%;
        }
        p{
          height:100px;
          background-color: red;
        }
        div{
          height:calc(100% - 120px);
          background-color: green;
        }
      </style>
    </head>
    <body>
      <p>
        1
      </p>
      <div>
        2
      </div>
      <div class="name">今天天气不错</div>
    </body>
    </html>
    
    `)

  })
}).listen(8088);
console.log('start……')