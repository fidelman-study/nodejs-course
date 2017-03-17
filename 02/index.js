/*

*/

// Readable, Writable, Duplex, Tranform

const fs = require('fs');

const s = fs.createReadStream('asdflkjasdfkjlas;dklfjaskld');

// s.on('error', err => ...);

// console.log(s);
// console.log('==============');
// setTimeout(() => console.log(s), 500);

// paused
// s.read(chunk => ...)
// s.on('readable', () => console.log(s));

// flowing
// s.on('data', chunk => res.write(chunk));
// s.removeEventListener('data', cb);
// s.pipe(w)

// Stream1, Stream2, Stream3

// ---
// .resume() / .pause()
