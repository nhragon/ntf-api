const logger = require('modules/logger');
const constant = require('modules/constant');
const config = require('modules/config');
const utils = require('modules/utils');
const Joi = require('@hapi/joi');
const authAdmin = require('modules/auth')();
const ethereumjsUtil = require('ethereumjs-util');
const adminService = require('../dbService/admin.service');

const controller = {};

controller.login = async (req, res) => {
    logger.trace('admin.controller::login:CALL');
    const schema = Joi.object().keys({
        username: Joi.string().required().max(150).regex(constant.EXCLUDE_SPECIAL_CHARS_REGEX, 'username'),
        password: Joi.string().required().max(150),
    });

    const validator = schema.validate(req.body);
    if (validator.error) {
        logger.trace(`admin.controller::login:${validator.error}`);
        return res.error(constant.ERROR.BAD_REQUEST, validator.error.details[0].message);
    }

    const [error, data] = await adminService.login(validator.value.username, validator.value.password);
    if (error) {
        logger.warn(`admin.controller::login:${error.message}`);
        return res.error(error);
    }

    return res.success(data);
};

controller.loginTorus = async (req, res) => {
    logger.trace('admin.controller::loginTorus:CALL');
    const schema = Joi.object().keys({
        address: Joi.string()
            .lowercase()
            .required()
            .regex(/^0x[a-f0-9]{40}$/, 'ETH address'),
        sign: Joi.string()
            .required()
            .regex(/^0x[a-fA-F0-9]*$/, 'sign'),
        timestamp: Joi.number().integer().required(),
    });

    const validator = schema.validate(req.body);
    if (validator.error) {
        logger.trace(`admin.controller::loginTorus:${validator.error}`);
        return res.error(constant.ERROR.BAD_REQUEST, validator.error.details[0].message);
    }

    const { address, sign, timestamp } = validator.value;
    const _seed = `${address}_${timestamp}`;

    if (global.seed[_seed]) {
        return res.error(constant.ERROR.BAD_REQUEST);
    }

    global.seed[_seed] = 1;

    const now = new Date().getTime();

    if (now - parseInt(timestamp) > 300000) {
        return res.error(constant.ERROR.BAD_REQUEST);
    }

    const signature = ethereumjsUtil.fromRpcSig(sign);
    const personalMsg = ethereumjsUtil.hashPersonalMessage(Buffer.from(_seed));
    const pubKey = ethereumjsUtil.ecrecover(Buffer.from(personalMsg), signature.v, signature.r, signature.s);
    const addrBuf = ethereumjsUtil.pubToAddress(pubKey);
    const addressDecode = ethereumjsUtil.bufferToHex(addrBuf);

    if (addressDecode.toLowerCase() !== address) {
        return res.error(constant.ERROR.BAD_REQUEST);
    }

    const [error, data] = await adminService.loginTorus(address);
    if (error) {
        logger.warn(`admin.controller::loginTorus:${error.message}`);
        return res.error(error);
    }

    const payload = {
        id: data.id,
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        emailAddress: data.emailAddress,
        ethAddress: data.ethAddress,
        role: data.role
    };

    return res.success({
        ...data,
        accessToken: authAdmin.generateJWT(payload),
        refreshToken: authAdmin.generateRefreshJWT(payload, config.REFRESH_TOKEN_EXPIRES_IN_SEC)
    });
};

module.exports = controller;
