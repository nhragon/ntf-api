/* eslint-disable no-unused-vars */
const logger = require('modules/logger');
const constant = require('modules/constant');

const middleware = {};

middleware.handleError = (err, req, res, next) => {
    if (err.type != null) {
        logger.warn(`app.middleware::handleError: ${err.message}`);
    } else {
        logger.error(`Internal server error - request - sessionID: ${req.sessionID} - ${err.stack} `);
    }
    if (err.code === 'EBADCSRFTOKEN') {
        return res.error(constant.ERROR.BAD_REQUEST, err.message);
    }
    return res.error(err);
};

middleware.handleNotFound = (req, res, next) => {
    logger.debug(`Route not found - request url: ${req.url} `);
    return res.error(constant.ERROR.NOT_FOUND);
};

module.exports = middleware;
