const { getContentType, sendStatusCode } = require('./helpers');
const fs = require('fs');

module.exports = function sendFile(filename, res) {
    const pathname = __dirname + '/files' + filename;
    const stream = new fs.ReadStream(pathname, { encoding: 'utf-8' });

    let content = '';

    stream.on('data', (chunk) => {
        content += chunk;
    });

    stream.on('end', () => {
        if (!content) {
            sendStatusCode(204, res);
            return;
        }

        res.setHeader('Content-Type', getContentType(pathname));
        res.end(content);
        console.log(`File ${pathname} has been sent`);
    });

    stream.on('error', () => {
        sendStatusCode(404, res);
    });
}