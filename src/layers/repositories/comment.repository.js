const mysql = require('mysql2');

/**
 * 생성하는 거(행동, 책임) -> 결과 ? -> { 생성된 객체 } or null( 실패 )
 * 
 * @param { mysql.PoolConnection } poolConnection 
 * @param { number } userId 
 * @param { number } articleId
 * @param { string } content : ;
 * @returns 
 */

 const isExistsArticle = async (poolConnection, userId) => {

    const isExistsQuery = `SELECT * FROM article WHERE article_id = ${articleId};`;
    const queryResult = await poolConnection.query(isExistsQuery);

    const selectResult = queryResult[0];

    return selectResult.length !== 0 ? true : false;

}
const createComment = async (poolConnection, userId, articleId, content) => {
    
    const createQuery = `INSERT INTO comment (user_id, articleId, content) VALUES (${userId}, '${articleId}', '${content}');`;
    const queryResult = await poolConnection.query(createQuery);

    const insertResult = queryResult[0];

    if (insertResult.affectedRows !== 1) return null;
    else return ({
        commentId: insertResult.insertId, userId, articleId, content
    });

}

module.exports = {
    createComment,
    isExistsArticle
}