// слишком простой чат, в коде есть минимум 7 серьёзных ошибок - КАКИХ?

const http = require('http');
const fs = require('fs');

let clients = [];

http.createServer((req, res) => {

  switch (req.method + ' ' + req.url) {
    case 'GET /':
    // set header
    //   file error
    // req close
    fs.createReadStream('index.html').pipe(res);
    break;

  case 'GET /subscribe':
    // check existing
    console.log("subscribe");
    clients.push(res);
    break;

  case 'POST /publish':
    let body = '';

      // req close
    req
      .on('data', data => {
        body += data;
      })
      .on('end', () => {
        // body to string
        body = JSON.parse(body);

        console.log("publish '%s'", body.message);

        clients.forEach(res => {
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
