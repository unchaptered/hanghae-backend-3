const mysql = require('mysql2');

/**
 * isExists 존재하는지 `확인` -> boolean
 * 
 * @param { mysql.PoolConnection } poolConnection 
 * @param { number } userId 
 * @returns 
 */
const isExists = async (poolConnection, userId) => {

    const isExistsQuery = `SELECT * FROM user WHERE user_id = ${userId};`;
    const queryResult = await poolConnection.query(isExistsQuery);

    const selectResult = queryResult[0];

    return selectResult.length !== 0 ? true : false;

}

const join = (userDto) => {

    return `
        INSERT INTO user (nickname, password) 
            VALUES ("${userDto.nickname}", "${userDto.password}");`;
}

const login = (userDto) => {

    return `
        SELECT nickname FROM user
            WHERE nickname = "${userDto.nickname}" AND password = "${userDto.password}";`;
}

module.exports = {
    join,
    login,
    isExists
}