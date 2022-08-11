const mysql = require('mysql2');

class AuthRepository {
 
    constructor() {}

/**
 * isExists 존재하는지 `확인` -> boolean
 *
 * @param { mysql.PoolConnection } poolConnection
 * @param { number } userId
 * @returns
 */
 isExists = async (poolConnection, userId) => {
    const isExistsQuery = `SELECT * FROM user WHERE user_id = ${userId};`;
    const queryResult = await poolConnection.query(isExistsQuery);

    const selectResult = queryResult[0];

    return selectResult.length !== 0 ? true : false;
};

getUserIdAndPassword = async (poolConnection, nickname) => {
    const getPasswordQuery = `SELECT user_id, password FROM user WHERE nickname = '${nickname}';`;
    const queryResult = await poolConnection.query(getPasswordQuery);

    const selectResult = queryResult[0];
    //console.log(selectResult);
    return selectResult.length !== 0 ? selectResult[0] : false;
};

join = async (poolConnection, nickname, password) => {
    const joinQuery = `
        INSERT INTO user (nickname, password) 
            VALUES ("${nickname}", "${password}");`;
    const queryResult = await poolConnection.query(joinQuery);

    const insertResult = queryResult[0];

    if (insertResult.affectedRows !== 1) return null;
    else
        return {
            nickname: nickname,
        };
};

login = async (poolConnection, nickname, password) => {
    const loginQuery = `
        SELECT user_id FROM user
            WHERE nickname = "${nickname}" AND password = "${password}";`;

    const queryResult = await poolConnection.query(loginQuery);
    const selectResult = queryResult[0];
    if (selectResult.length === 0) return null;
    else
        return {
            userId: selectResult[0],
        };
};
}


module.exports = AuthRepository;
