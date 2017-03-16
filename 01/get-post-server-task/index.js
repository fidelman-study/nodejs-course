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

const uploadFile = require('./upload-file');
const sendIndex = require('./send-index');
const sendFile = require('./send-file');

const { sendStatusCode } = require('./helpers');

require('http').createServer(function(req, res) {
  let pathname = decodeURI(url.parse(req.url).pathname);

  switch(req.method) {
  case 'GET':
    if (pathname == '/') {
      sendIndex(res);
    } else if (pathname !== '/subscribe') {
      sendFile(pathname, res);
    }
    break;

  case 'POST':
    uploadFile(req, res);
    break;

  default:
    sendStatusCode(502, res);
  }

}).listen(3000);
