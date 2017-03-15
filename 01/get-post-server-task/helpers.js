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

exports.getContentType = getContentType;