const fs = require('fs');

const s = fs.createWriteStream('1', {flags: 'a'});

s.write('lala');
s.end()
