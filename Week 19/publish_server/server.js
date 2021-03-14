let http = require('http');
let https = require('https');
// let fs = require('fs');
let unzipper = require('unzipper');
let querystring = require('querystring');
const { hostname } = require('os');

// 2. auth 路由：接收 code，用 code + client_id + client_secret 换 token 将换取的token回传给客户端
function auth(request, response) {
  let query = querystring.parse(request.url.match(/^\/auth\?([\s\S]+)$/)[1]);
  console.log('query: ', query.code);
  getToken(query.code, function(info) {
    console.log('info: ', info);
    // response.write(JSON.stringify(info));
    response.write(`<a href='http://localhost:8083?token=${info.access_token}'>publish</a>`);
    // 不 end 的话，浏览器一直在等待 response
    response.end();
  });
}

function getToken(code, callback) {
  let request = https.request({
    hostname: "github.com",
    path: `/login/oauth/access_token?code=${code}&client_id=Iv1.94086426fc46360b&client_secret=2152dd9ec175f454b0e52bac7dd88ab289f6d71b`,
    port: 443,
    method: "POST",
  }, function(response) {
    let body = '';
    response.on('data', chunk => {
      body += chunk.toString();
    });
    response.on('end', chunk => {
      callback(querystring.parse(body));
    });
  });
  request.end();
}

// 4. publish 路由: 用 token 获取用户信息, 检查权限,接受发布
function publish(request, response) {
  let query = querystring.parse(request.url.match(/^\/publish\?([\s\S]+)$/)[1]);
  getUser(query.token, info => {
    if (info.login === "ZhangL3") {
      request.pipe(unzipper.Extract({path: '../server/public/'}))
      request.on('end', () => {
        response.end("success!");
      })
    }
  });
}

function getUser(token, callback) {
    let request = https.request({
      hostname: "api.github.com",
      path: `/user`,
      port: 443,
      method: "GET",
      headers: {
        Authorization: `token ${token}`,
        "User-Agent": 'toy-publish-auth',
      },
    }, function(response) {
      let body = '';
      response.on('data', chunk => {
        body += chunk.toString();
      });
      response.on('end', chunk => {
        console.log('body: ', body);
        callback(JSON.parse(body));
      });
    });
    request.end();
}

http.createServer(function (request, response) {
  // request.url: http://localhost:8882/auth?code=xxx
  if (request.url.match(/^\/auth\?/)) {
    return auth(request, response);
  }
  if (request.url.match(/^\/publish\?/)) {
    return publish(request, response);
  }
  // console.log('request.headers: ', request.headers);

  // let outFile = fs.createWriteStream("../server/public/tmp.zip");
  // request.pipe(outFile);

  // request.on('data', chunk => {
  //   console.log('data: ', chunk.toString());
  //   outFile.write(chunk);
  // })

  // request.on('end', chunk => {
  //   outFile.end();
  //   console.log('success: ', chunk);
  // })
  // request.pipe(unzipper.Extract({path: '../server/public/'}))
}).listen(8882);