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
    response.end(`<html maaa=a >
    <head>
          <style>
   #container{
     width:500px;
     height:300px;
     display:flex;
    }
    #container #myid{
      width:200px;
    }
    #container .c1{
      flex:1;
    }
      </style>
    </head>
    <body>
      <div id="container">
        <div id="myid"></div>
        <div class="c1"></div>
      </div>
    </body>
    </html>`)

  })
}).listen(8088);
console.log('start……')