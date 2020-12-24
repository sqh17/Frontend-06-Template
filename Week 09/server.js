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
    response.end(' Hello World\n')

  })
}).listen(8088);
console.log('start……')