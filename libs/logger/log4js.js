const log4js = require('log4js');
const config = require('modules/config');
const path = require('path');

const env = process.env.NODE_ENV;

// Default file log path
config.LOGGER_FILE_LOG_PATH = config.LOGGER_FILE_LOG_PATH
    ? `${config.LOGGER_FILE_LOG_PATH}/log/${config.LOGGER_FILE_LOG_NAME}`
    : `${global.basedir}/log/${config.LOGGER_FILE_LOG_NAME}`;
const layout = {
    type: 'pattern',
    pattern: config.LOGGER.LAYOUT_PATTERN,
};

const appenders = [];

if (config.LOGGER.FILE_ENABLE) {
    appenders.push('file');
}

if (config.LOGGER.CONSOLE_ENABLE) {
    appenders.push('console');
}

log4js.configure({
    pm2: true,
    pm2InstanceVar: 'COVI_ADMIN_API_INSTANCE_ID',
    disableClustering: true,
    appenders: {
        console: {
            type: 'console',
            layouts: layout,
        },
        file: {
            type: 'file',
            filename: config.LOGGER_FILE_LOG_PATH,
            maxLogSize: config.LOGGER_FILE_LOG_MAX_SIZE,
            backups: config.LOGGER_FILE_LOG_BACKUP_NUMBERS,
            layouts: layout,
        },
    },
    categories: {
        default: { appenders: ['console'], level: 'all' },
        [env]: { appenders, level: config.LOGGER.LEVEL },
    },
});

module.exports = log4js.getLogger(env);
