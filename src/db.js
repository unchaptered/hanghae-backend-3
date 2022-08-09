const mysql = require('mysql2/promise');
const {
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_DATABASE,
    MYSQL_PASSWORD,
    MYSQL_WAIT_FOR_CONNECTION,
    MYSQL_CONNECTION_LIMIT
} = require('./env');

/**
 * 즉시 실행 함수 (IIFE, Immediately-invoked function expression)
 * 
 * 1. 한 번만 실행 (다른 친구가 다시 못부르게...)
 * 2. 은닉화
 * 
 * ( () => {} )() 의 형태와 같이 작성하여 함수를 즉시 실행하는 형태로 구성
 */
module.exports = (async () => {

    return await mysql.createPool({
        host: MYSQL_HOST,
        user: MYSQL_USER,
        database: MYSQL_DATABASE,
        password: MYSQL_PASSWORD,
        waitForConnections: MYSQL_WAIT_FOR_CONNECTION,
        connectionLimit: MYSQL_CONNECTION_LIMIT
    })

})(
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_DATABASE,
    MYSQL_PASSWORD,
    MYSQL_WAIT_FOR_CONNECTION,
    MYSQL_CONNECTION_LIMIT
);
