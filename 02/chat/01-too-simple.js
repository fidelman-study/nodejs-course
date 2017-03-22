// слишком простой чат, в коде есть минимум 7 серьёзных ошибок - КАКИХ?

const http = require('http');
const fs = require('fs');

let clients = [];

http.createServer((req, res) => {

  switch (req.method + ' ' + req.url) {
    case 'GET /':
    // set header
    // file error
    // req close
    fs.createReadStream('index.html').pipe(res);
    break;

    case 'GET /subscribe':
    // req close -> remove client
    console.log("subscribe");
    clients.push(res);
    break;

  case 'POST /publish':
    let body = '';
      //  Set encoding
    req
      .on('data', data => {
        // Check the weight of the body
        body += data;
      })
      .on('end', () => {
        // body to string
        // non valid JSON (try catch)
        body = JSON.parse(body);


        // does body.message exists?
        // is body.message string?
        console.log("publish '%s'", body.message);

        clients.forEach(res => {
          // add no-cache
          res.end(body.message);
        });

        clients = [];

        res.end("ok");
      });

    break;

  default:
    res.statusCode = 404;
    res.end("Not found");
  }


}).listen(3000);
