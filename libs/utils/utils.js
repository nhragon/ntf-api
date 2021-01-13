const config = require('modules/config');
const path = require('path');
const fs = require('fs');

const lib = {};

lib.verifyImage = (storePath, name) => {
    var imagePath = path.join(storePath, name)

    return fs.existsSync(imagePath)
}

lib.removeFile = (name) => {
    const filePath = path.join(config.STORE_PATH, name);
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
}

module.exports = lib;
