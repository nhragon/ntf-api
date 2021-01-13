const config = require('modules/config');
const constant = require('modules/constant');
const adminCrypto = require('modules/admin-crypto');
const fs = require('fs');

const service = {};

service.login = async (username, password) => {
    const [error, data] = await mysql.query('CALL sp_select_admin_with_line(?, ?);', [null, username]);
    if (error != null) return [error];
    if (data[0] == null || data[0].length === 0) return [constant.ERROR.USER_DOES_NOT_EXISTS];
    if (data[0][0].isDisabled === 1) return [constant.ERROR.DISABLED];
    if (data[0][0].isActivated === 0) return [constant.ERROR.USER_IS_NOT_ACTIVATED];
    if (adminCrypto.verifyPassword(password, data[0][0].password) === false) {
        return [constant.ERROR.CUSTOM_MESSAGE(constant.ERROR.BAD_REQUEST, 'INVALID_PASSWORD')];
    }

    delete data[0][0].password;

    return [null, { ...data[0][0], permissions: JSON.parse(data[1][0].permissions) || [] }];
};

service.loginTorus = async (ethAddress) => {
    const [error, data] = await mysql.query(
        'CALL sp_select_admin_by_address(?);', [ethAddress]
    );
    if (error != null) return [error];
    if (data[0] == null || data[0].length === 0) return [constant.ERROR.USER_DOES_NOT_EXISTS];
    if (data[0][0].isDisabled === 1) return [constant.ERROR.USER_IS_DISABLED];

    delete data[0][0].password;

    return [null, data[0][0]];
};

module.exports = service;
