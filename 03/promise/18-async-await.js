// Проблема отсутствующего catch и проглоченной ошибки

const fs = require('mz/fs');

// 7, < 7.6 --harmony; node --harmony index.js
// node

// function a() {throw new Error()}
// function b() {a()}
// function c() {b()}
// function d() {c()}
//
// try {
//   d()
// } catch(err) {
//   //
// }

// es2017

async function read(path) {
  const stat = await fs.stat(path);

  if (stat.isDirectory()) {
    const files = await fs.readdir(path);
    return files;
  } else {
    const content = await fs.readFile(path);
    return content;
  }
}

read(__dirname).then(console.log).catch(err => ...)

// async function foo() {
//
// }
//
// console.log(typeof (foo()).then) // undefined
