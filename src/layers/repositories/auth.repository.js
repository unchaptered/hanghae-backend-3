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

const join = async (poolConnection, userDto) => {

    const joinQuery = `
        INSERT INTO user (nickname, password) 
            VALUES ("${userDto.nickname}", "${userDto.password}");`;
    const queryResult = await poolConnection.query(joinQuery);

    const insertResult = queryResult[0];
    
    if (insertResult.affectedRows !== 1) return null;
    else return ({
        nickname : userDto.nickname
    });

}

const login = async (poolConnection, userDto) => {
    
    const loginQuery = `
        SELECT user_id FROM user
            WHERE nickname = "${userDto.nickname}" AND password = "${userDto.password}";`;

    const queryResult = await poolConnection.query(loginQuery);
    const selectResult = queryResult[0];
    if (selectResult.length === 0) return null;
    else return ({
        userid : selectResult[0]
    });
 
}

module.exports = {
    join,
    login,
    isExists
}