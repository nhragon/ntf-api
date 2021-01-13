module.exports = function (data, httpStatus = 200) {
    this.status(httpStatus);
    this.send({
        error_code: null,
        message: null,
        result: data,
    });
};
