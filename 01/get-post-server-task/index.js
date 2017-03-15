/**
 ЗАДАЧА
 Написать HTTP-сервер для загрузки и получения файлов
 - Все файлы находятся в директории files
 - Структура файлов НЕ вложенная.

 - Виды запросов к серверу
   GET /file.ext
   - выдаёт файл file.ext из директории files,
   - правильный mime-type по содержимому (модуль mime)

   POST /file.ext
   - пишет всё тело запроса в файл files/file.ext и выдаёт ОК
   - если файл уже есть, то выдаёт ошибку 409
   - при превышении файлом размера 1MB выдаёт ошибку 413

 Вместо file может быть любое имя файла.
 Так как поддиректорий нет, то при наличии / или .. в пути сервер должен выдавать ошибку 400.

- Сервер должен корректно обрабатывать ошибки "файл не найден" и другие (ошибка чтения файла)
- index.html или curl для тестирования


 */

// Пример простого сервера в качестве основы

'use strict';

let url = require('url');
let fs = require('fs');

const getContentType = require('./helpers').getContentType;

const indexFile = __dirname + '/public/index.html';

require('http').createServer(function(req, res) {
  let pathname = decodeURI(url.parse(req.url).pathname);

  switch(req.method) {
  case 'GET':
    if (pathname == '/') {
      const stream = new fs.ReadStream(indexFile, { encoding: 'utf-8' });
      const contentType = getContentType(indexFile);

      stream.on('data', (chunk) => {
        res.setHeader('Content-Type', contentType);
        res.end(chunk);
      });

      stream.on('end', () => {
        console.log('Success');
      });

      stream.on('error', (err) => {
        console.error(err);
        res.statusCode = 500;
        res.end('Server Error');
      });

    } else if (pathname !== '/subscribe') {
      sendFile(pathname, res);
    }
    break;

  default:
    res.statusCode = 502;
    res.end("Not implemented");
  }

}).listen(3000);

function sendFile(filename, res) {
  const pathname = __dirname + '/files' + filename;
  const stream = new fs.ReadStream(pathname, { encoding: 'utf-8' });

  let content = '';

  stream.on('data', (chunk) => {
    content += chunk;
  });



  stream.on('end', () => {
    if (!content) {
      res.statusCode = 500;
      res.end('Server Error');

      return;
    }

    res.setHeader('Content-Type', getContentType(pathname));
    res.end(content);
    console.log(`File ${pathname} has been sent`);
  });

  stream.on('error', () => {
    res.statusCode = 400;
    res.end('File is not Found');
  });
}
