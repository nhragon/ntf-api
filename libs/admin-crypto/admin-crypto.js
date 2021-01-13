const bcrypt = require('bcryptjs');

const lib = {};

lib.hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
};

lib.verifyPassword = (password, hash) => bcrypt.compareSync(password, hash);

module.exports = lib;
