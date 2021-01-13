const mysql = require('mysql2/promise');
const logger = require('modules/logger');
const config = require('modules/config');

const handlePromise = (promise, sql) =>
    promise
        .then(([rows, fields]) => {
            return [null, rows]
        })
        .catch((error) => {
            logger.info('query error::', sql)
            logger.error(`mysql-connection:lib:handlePromise:${error}`);
            return [error];
        });

class MysqlConnection {
    constructor() {
        this.options = {
            host: config.MYSQL.HOST,
            port: config.MYSQL.PORT,
            user: config.MYSQL.USER,
            password: config.MYSQL.PWD,
            database: config.MYSQL.SCHEMA,
            multipleStatements: true,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        };
    }

    async connect() {
        logger.debug(`MySQL::connect::url: ${this.options.host}`);
        this.pool = await mysql.createPool(this.options);
        await this.query('SELECT 1;');
        logger.info(`MySQL::connected::url: ${this.options.host}`);
    }

    getConnection() {
        return this.pool.getConnection();
    }

    async close() {
        await this.pool.end();
        logger.warn(`MySQL::disconnected::url: ${this.options.host}`);
    }

    async query(sql, args) {
        logger.info('query::', sql);
        const [error, data] = await handlePromise(this.pool.query(sql, args), sql);
        return [error, data];
    }

    async paginate(sql, values = [], page = 0, limit = 10) {
        logger.info('paginate::', sql);
        const offset = page * limit - limit;
        const [error, data] = await handlePromise(this.pool.query(sql, [...values, limit, offset]));
        if (error) return [error];
        if (data.length < 3) {
            return [
                null,
                {
                    totalRecords: 0,
                    totalPages: 0,
                    page: 0,
                    limit: 0,
                    results: [],
                },
            ];
        }
        const totalRecords = data[0][0].cnt;
        const totalPages = totalRecords === 0 ? 1 : Math.ceil(totalRecords / limit);
        page = page > totalPages ? totalPages : page;
    
        return [
            null,
            {
                totalRecords: data[0][0].cnt,
                totalPages,
                page,
                limit,
                results: data[1],
            },
        ];
    }

    async execute(sql, values) {
        return this.pool.execute(sql, values);
    }

    async format(value) {
        return this.pool.format('?', [value]);
    }

    async formatSQL(sql, values) {
        return this.pool.format(sql, values);
    }
}

module.exports = MysqlConnection;
