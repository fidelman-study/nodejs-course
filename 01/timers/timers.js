// В какой момент срабатывают - до или после чтения файла?
const fs = require('fs');
// microqueue | macroqueue
// microqueue = [nextTick, Promise]
// setImmediate
// macroqueue = [fs.open, fs.open]
console.time('file');
// fs.open(__filename, 'r', (err, fd) => {
//   console.log('IO!'); // 1
//   console.timeEnd('file');
// });

const fd = fs.openSync(__filename, 'r');
console.log('IO');

Promise.resolve('lala').then(console.log);

// // for (let i = 0; i < 3; i++) {
// setImmediate(() => {
//   console.log('immediate'); // 2
// });
//
// new Promise(resolve => {
//   resolve('promise'); // 4
// }).then(console.log);
// // }
//
// process.nextTick(() => {
//   console.log('nextTick'); // 3
// });
//
// console.log('start!'); // 5
console.log('array');
(new Array(1000000)).fill('lala').forEach(str => str[0]);
