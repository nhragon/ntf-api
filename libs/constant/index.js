class CustomError extends Error {
    constructor(message, type) {
        super(message);
        this.type = type;
    }
}

module.exports = {
    ERROR: {
        BAD_REQUEST: {
            httpStatus: 400,
            code: 'BAD_REQUEST',
            message: 'INVALID_INPUT',
        },
        UNAUTHORIZED: {
            httpStatus: 401,
            code: 'UNAUTHORIZED',
            message: 'UNAUTHORIZED',
        },
        FORBIDDEN: { httpStatus: 403, code: 'FORBIDDEN', message: 'FORBIDDEN' },
        USER_IS_NOT_ACTIVATED: {
            httpStatus: 404,
            code: 'USER_IS_NOT_ACTIVATED',
            message: 'USER_IS_NOT_ACTIVATED',
        },
        USER_DOES_NOT_EXISTS: {
            httpStatus: 404,
            code: 'USER_DOES_NOT_EXISTS',
            message: 'USER_DOES_NOT_EXISTS',
        },
        USER_IS_DISABLED: {
            httpStatus: 401,
            code: 'USER_IS_DISABLED',
            message: 'USER_IS_DISABLED',
        },
        NOT_FOUND: {
            httpStatus: 404,
            code: 'NOT_FOUND',
            message: 'ROUTE_NOT_FOUND',
        },
        INTERNAL_SERVER_ERROR: {
            httpStatus: 500,
            code: 'INTERNAL_SERVER_ERROR',
            message: 'INTERNAL_SERVER_ERROR',
        },
        DATABASE_ERROR: {
            httpStatus: 500,
            code: 'DATABASE_ERROR',
            message: 'DATABASE_ERROR',
        },
        CUSTOM: (httpStatus, code, message) => ({ httpStatus, code, message }),
        CUSTOM_MESSAGE: (constantError, message) => ({ ...constantError, message }),
    },
    EXCLUDE_SPECIAL_CHARS_REGEX: /^[^^/{}()<>&*'|=?;[\]\$#~!%\\:+`'"]*$/,
    EXCLUDE_SPECIAL_CHARS_REGEX_FOR_ADDRESS: /^[^^{}<>|=?\[\]\$~!%\+`'\\"]{0,200}$/,
    EXCLUDE_SPECIAL_CHARS_REGEX_FOR_SEARCH: /^[^^/{}()<>&'|=?;[\]\$#~!%\\:`']*$/,
    ETH_ADDRESS_REGEX: /^0x[a-fA-F0-9]{40}$/,
    CustomError,
    AES_ALGORITHM: 'aes-256-ctr',
};
