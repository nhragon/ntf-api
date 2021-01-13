const config = require('modules/config');
const logger = require('modules/logger');
const constant = require('modules/constant');
const rp = require('request-promise');

const handlePromise = function (promise) {
    return promise
        .then((data) => [null, data])
        .catch((error) => {
            logger.error(`http-request.lib:handlePromise:error:${error.message}`);
            return [error];
        });
};

const lib = {};

lib.request = async (uri, method = 'GET', body = {}, headers = {}) => {
    const [error, data] = await handlePromise(
        rp({
            method,
            uri,
            body,
            json: true,
        })
    );
    return lib.handleResponse(error, data);
};

lib.handleResponse = (error, data) => {
    if (error != null) {
        if (error.statusCode != null) {
            return [
                constant.ERROR.CUSTOM(
                    error.statusCode,
                    error.error && error.error.error_code,
                    error.error && error.error.message
                ),
            ];
        }
        return [
            constant.ERROR.CUSTOM(
                424,
                error.error && error.error.code,
                error.error && error.error.message
            ),
        ];
    }
    return [null, data];
};

module.exports = lib;
