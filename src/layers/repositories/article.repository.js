const mysql = require('mysql2');

/**
 * isExists 존재하는지 `확인` -> boolean
 * 
 * @param { mysql.PoolConnection } poolConnection 
 * @param { number } articleId 
 * @returns 
 */
const isExists = async (poolConnection, articleId) => {

    const isExistsQuery = `SELECT * FROM article WHERE article_id = ${articleId};`;
    const queryResult = await poolConnection.query(isExistsQuery);

    const selectResult = queryResult[0];

    return selectResult.length !== 0 ? true : false;

}

/**
 * 
 * @param { mysql.poolConnection } poolConnection 
 * @param { number } articleId 
 * @returns { Promise< { articleId: number, userId: number, title: string, content: string } | null >}
 */
const getArticleById = async (poolConnection, articleId) => {

    const selectQuery = `SELECT article_id as articleId, user_id as userId, title, content FROM article WHERE article_id = ${articleId};`;
    const queryResult = await poolConnection.query(selectQuery);

    const selectResult = queryResult[0];
    
    return selectResult.length !== 0 ? selectResult[0] : null;

}

/**
 * 생성하는 거(행동, 책임) -> 결과 ? -> { 생성된 객체 } or null( 실패 )
 * 
 * @param { mysql.PoolConnection } poolConnection 
 * @param { number } userId 
 * @param { string } title 
 * @param { string } content : ;
 * @returns { Promise< { articleId: number, userId: number, title: string, content: string } | null >}
 */
const createArticle = async (poolConnection, userId, title, content) => {
    
    const createQuery = `INSERT INTO article (user_id, title, content) VALUES (${userId}, '${title}', '${content}');`;
    const queryResult = await poolConnection.query(createQuery);

    const insertResult = queryResult[0];

    if (insertResult.affectedRows !== 1) return null;
    else return ({
        articleId: insertResult.insertId, userId, title, content
    });

}

/**
 * 
 * @param { mysql.PoolConnection } poolConnection 
 * @param { number } articleId 
 * @param { string } title 
 * @param { string } content 
 */
const updateArticleById = async (poolConnection, articleId, title, content) => {

    const updateQuery = `UPDATE article SET title = '${title}', content = '${content}' WHERE article_id = ${articleId};`;
    const queryResult = await poolConnection.query(updateQuery);

    const updateResult = queryResult[0];

    return updateResult.affectedRows === 1 ? true : false;

}

/**
 * 
 * @param { mysql.PoolConnection } poolConnection 
 * @param { number } articleId 
 */
const deleteArticleById = async (poolConnection, articleId) => {
    
    const deleteQuery = `DELETE FROM article WHERE article_id = ${articleId};`;
    const queryResult = await poolConnection.query(deleteQuery);

    const deleteResult = queryResult[0];

    return deleteResult.affectedRows === 1 ? true : false;

}

module.exports = {

    isExists,

    getArticleById,
    createArticle,
    updateArticleById,
    deleteArticleById

}