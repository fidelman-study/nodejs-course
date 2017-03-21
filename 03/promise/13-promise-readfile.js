// ЗАДАЧА - сделать readFile, возвращающее promise
const fs = require('fs');

// fs.readFile(filepath, (err, content) => {});

(err, content) => {} // thunk

// ЗАДАЧА - прочитать все файлы текущей директории, используя новый readfile
// (последовательно или параллельно - как считаете нужным)
function readFile(filePath) {
  /* ваш код */
}

readFile(__filename).then(console.log, console.error);
