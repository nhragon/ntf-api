const serverConfigs = require('../../configs/servers.json');
const selfConfig = require(`../../configs/${process.env.NODE_ENV}.json`);

const config = Object.assign(selfConfig, {
    MYSQL: serverConfigs.MYSQL,
    LOGGER: serverConfigs.LOGGER,
})

config.STORE_PATH = config.STORE_PATH.replace(
    /\$\{rootPath\}/g,
    global.basedir,
);

module.exports = config;
