const { getContentType, sendStatusCode } = require('./helpers');
const fs = require('fs');

module.exports = function sendIndex(res) {
    const indexFile = __dirname + '/public/index.html';
    const stream = new fs.ReadStream(indexFile, { encoding: 'utf-8' });
    const contentType = getContentType(indexFile);

    let content = '';

    stream.on('data', (chunk) => {
        content += chunk;
    });

    stream.on('end', () => {
        res.setHeader('Content-Type', contentType);
        res.end(content);
    });

    stream.on('error', (err) => {
        console.error(err);
        sendStatusCode(500, res);
    });
};