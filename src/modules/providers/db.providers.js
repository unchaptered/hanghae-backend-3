const mysql = require('mysql2/promise');
const MysqlEnv = require('../../models/env/mysql.env');

class DatabaseProvider {
    /** @type { mysql.Pool } */
    static pool;

    constructor() {}

    /** @type { MysqlEnv } mysqlEnv */
    static initialize(mysqlEnv) {
        if (this.pool) return this.pool;

        this.pool = mysql.createPool({
            host: mysqlEnv.HOST,
            user: mysqlEnv.USER,
            database: mysqlEnv.DATABASE,
            password: mysqlEnv.PASSWORD,
            waitForConnections: mysqlEnv.WAIT_FOR_CONNECTION,
            connectionLimit: mysqlEnv.CONNECTION_LIMIT,
        });

        return this.pool;
    }

    async getConnection() {
        return DatabaseProvider.pool.getConnection();
    }
}

module.exports = DatabaseProvider;
