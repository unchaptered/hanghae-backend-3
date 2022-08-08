require('dotenv/config');

/**
 * 즉시 실행 함수 (IIFE, Immediately-invoked function expression)
 * 
 * 1. 한 번만 실행 (다른 친구가 다시 못부르게...)
 * 2. 은닉화
 * 
 * ( () => {} )() 의 형태와 같이 작성하여 함수를 즉시 실행하는 형태로 구성
 */
module.exports = (() => {
    
    const env = {
        PORT: process.env.PORT,
        MYSQL_HOST: process.env.MYSQL_HOST,
        MYSQL_USER: process.env.MYSQL_USER,
        MYSQL_DATABASE: process.env.MYSQL_DATABASE,
        MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
        MYSQL_WAIT_FOR_CONNECTION: process.env.MYSQL_WAIT_FOR_CONNECTION,
        MYSQL_CONNECTION_LIMIT: process.env.MYSQL_CONNECTION_LIMIT,
        BCRYPT_SALT: process.env.BCRYPT_SALT,
        JWT_SECRET: process.env.JWT_SECRET,
        JWT_ALGORITHM: process.env.JWT_ALGORITHM
    };

    return env;

})();