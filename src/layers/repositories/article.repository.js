const mysql = require('mysql2');

/**
 * 생성하는 거(행동, 책임) -> 결과 ? -> { 생성된 객체 } or null( 실패 )
 * 
 * @param { mysql.PoolConnection } poolConnection 
 * @param { number } userId 
 * @param { string } title 
 * @param { string } content 
 * @param { number } articleId
 * @param { number } likeId
 * @param { boolean } isLike: ;
 * @returns 
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

const isExists = async (poolConnection, articleId) => {

    const isExistsQuery = `SELECT * FROM article WHERE article_id = ${articleId};`;
    const queryResult = await poolConnection.query(isExistsQuery);
    
    const selectResult = queryResult[0];

    return selectResult.length !== 0 ? true : false;

}

const isLikeExists = async (poolConnection, userId, articleId) => {

    const isExistsQuery = `SELECT * FROM article_like WHERE article_id = ${articleId} AND user_Id = ${userId};`;
    const queryResult = await poolConnection.query(isExistsQuery);
    
    const selectResult = queryResult[0];

    return selectResult.length !== 0 ? true : false;

}

const createArticleLike = async (poolConnection, userId, articleId, isLike) => {
    
    const createQuery = `INSERT INTO article_like (user_id, article_id, is_liked) VALUES (${userId}, ${articleId}, ${isLike});`;
    const queryResult = await poolConnection.query(createQuery);
    
    const insertResult = queryResult[0];

    if (insertResult.affectedRows !== 1) return null;
    else return ({
        likeId: insertResult.insertId, userId, articleId, isLike
    });

}

const updateArticleLike = async (poolConnection, userId, articleId, isLike) => {
    
    const updateQuery = `UPDATE article_like SET is_liked = ${isLike} WHERE user_Id = ${userId} AND article_Id = ${articleId};`;
    const queryResult = await poolConnection.query(updateQuery);
    
    const insertResult = queryResult[0];

    if (insertResult.affectedRows !== 1) return null;
    else return ({
        likeId: insertResult.insertId, userId, articleId, isLike
    });

}


module.exports = {
    createArticle,
    createArticleLike,
    updateArticleLike,
    isExists,
    isLikeExists
}