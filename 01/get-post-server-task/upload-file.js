const fs = require('fs');
const { sendStatusCode } = require('./helpers');

module.exports = function uploadFile(req, res) {
    let length = 0;
    req.on('data', (chunk) => {
        length += chunk.length;
        if (length > 1024 * 1024) {
            sendStatusCode(413, res);
            req.destroy(); // Можно ли таким способом обрывать закачку при невыполнений условий?
        }
    }).on('end', () => {

        const pathname = __dirname + '/files' + req.url;

        fs.exists(pathname, (exists) => {
            if (!exists) {
                const writeStream = fs.createWriteStream(pathname);
                req.pipe(writeStream);

                writeStream.on('error', () => {
                    sendStatusCode(500, res);
                });

                sendStatusCode(200, res);
            } else {
                sendStatusCode(409, res);
            }
        });
    });
}
