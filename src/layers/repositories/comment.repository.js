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


const isExists = async (poolConnection, commentId) => {

    const isExistsQuery = `SELECT * FROM comment WHERE comment_id = ${commentId};`;
    const queryResult = await poolConnection.query(isExistsQuery);
    
    const selectResult = queryResult[0];

    return selectResult.length !== 0 ? true : false;

}

const isLikeExists = async (poolConnection, userId, commentId) => {

    const isExistsQuery = `SELECT * FROM comment_like WHERE comment_id = ${commentId} AND user_Id = ${userId};`;
    const queryResult = await poolConnection.query(isExistsQuery);
    
    const selectResult = queryResult[0];

    return selectResult.length !== 0 ? true : false;

}

const createCommentLike = async (poolConnection, userId, commentId, isLike) => {
    
    const createQuery = `INSERT INTO comment_like (user_id, comment_id, is_liked) VALUES (${userId}, ${commentId}, ${isLike});`;
    const queryResult = await poolConnection.query(createQuery);
    
    const insertResult = queryResult[0];

    if (insertResult.affectedRows !== 1) return null;
    else return ({
        likeId: insertResult.insertId, userId, commentId, isLike
    });

}

const updateCommentLike = async (poolConnection, userId, commentId, isLike) => {
    
    const updateQuery = `UPDATE comment_like SET is_liked = ${isLike} WHERE user_Id = ${userId} AND comment_Id = ${commentId};`;
    const queryResult = await poolConnection.query(updateQuery);
    
    const insertResult = queryResult[0];

    if (insertResult.affectedRows !== 1) return null;
    else return ({
        likeId: insertResult.insertId, userId, commentId, isLike
    });

}


module.exports = {    
    createCommentLike,
    updateCommentLike,
    isExists,
    isLikeExists,
    createComment,
    isExistsArticle
}