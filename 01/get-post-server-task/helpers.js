const mime = require('mime');

function getContentType(pathname) {
    const mimeType = mime.lookup(pathname);

    let charset = '';

    if (mimeType === 'text/html') {
        charset = `;charset=${mime.charsets.lookup(mimeType)}`;
    } else {
        charset = '';
    }

    return `${mimeType}${charset}`;
}

function sendStatusCode(num, res) {
    res.statusCode = num;

    switch (num) {
        case 200:
            res.end('Ok');
            break;
        case 204:
            res.end('File is Empty');
            break;

        case 404:
            res.end('File is not Found');
            break;

        case 409:
            res.end('The file already exists');
            break;

        case 413:
            res.end('File is too big (must be not more than 1MB)');
            break;

        case 502:
            res.end("Not implemented");
            break;

        case 500:
        default:
            res.end('Server Error');
            break;
    }
}

exports.getContentType = getContentType;
exports.sendStatusCode = sendStatusCode;