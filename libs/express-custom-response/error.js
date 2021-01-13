const constant = require('modules/constant');

module.exports = function (errorObj, message = null) {
    if (errorObj instanceof Error) {
        const errorRes = errorObj.type || constant.ERROR.INTERNAL_SERVER_ERROR;
        this.status(errorRes.httpStatus);
        this.send({
            error_code: errorRes.code,
            message: message || errorObj.message || errorRes.message,
        });
    } else {
        this.status(errorObj.httpStatus);
        this.send({
            error_code: errorObj.code,
            message: message || errorObj.message,
        });
    }
};
