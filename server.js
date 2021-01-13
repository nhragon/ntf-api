global.basedir = __dirname;
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
// const cors = require('cors');
const session = require('express-session');
require('express-async-errors');
require('modules/express-custom-response');
const config = require('modules/config');
const logger = require('modules/logger');
const MysqlConnection = require('modules/mysql-connection');
const appMiddleware = require('./middlewares/app.middleware');
const internalRouters = require('./routers/v1.internal.router');

const start = async () => {
    global.seed = {};
    global.mysql = new MysqlConnection();

    await global.mysql.connect();

    /**
     * Initialize
     */
    const app = express();

    app.use(
        session({
            secret: config.SESSION_SECRET,
            resave: false,
            saveUninitialized: false
        })
    );

    /**
     * Config middleware
     */
    app.use(helmet());
    app.disable('x-powered-by');

    const parseToken = (authorization) => {
        if (!authorization) return {};
        const token = authorization.split(' ')[1];
        const buff = Buffer.from(token.split('.')[1], 'base64');
        const payload = JSON.parse(buff.toString('utf8'));
        return payload.data;
    };

    const parseTokenAdmin = (req, res, next) => {
        if (req.headers.authorization) {
            req.admin = parseToken(req.headers.authorization);
        }
        return next();
    };

    const traceRequest = (req, res, next) => {
        logger.trace(`${req.method}: ${req.url}`);
        next();
    };

    // app.use(cors(corsOptions));
    app.use(bodyParser.json({ limit: config.BODY_PARSER_LIMIT }));
    app.use('/', traceRequest);
    app.use('/admin/internal', parseTokenAdmin, internalRouters);

    app.use(appMiddleware.handleNotFound);
    app.use(appMiddleware.handleError);

    app.listen(config.PORT, () => {
        logger.info(`Admin Api Listening on port ${config.PORT}`);
    });
}

start();
