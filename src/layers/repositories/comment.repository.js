const mysql = require('mysql2');

/**
 * 
 * @param { mysql.PoolConnection } poolConnection 
 * @param { number } commentId 
 * @returns { Promise< boolean > }
 */
 
/**
 * 
 * @param { mysql.poolConnection } poolConnection 
 * @returns { Promise< Array<{ articleId: number, userId: number, commentId: number, content: string }> > }
 */
 const getComment = async (poolConnection) => {

    const selectQuery = `SELECT comment_id as commentId, user_id as userId, article_id as articleId, content FROM comment LIMIT 100`;
    const queryResult = await poolConnection.query(selectQuery);

    const selectResult = queryResult[0];

    return selectResult;
    
}
/**
 * 
 * @param { mysql.poolConnection } poolConnection 
 * @param { number } commentId 
 * @returns { Promise< { articleId: number, userId: number, commentId: number, content: string } | null >}
 */
const getCommentById = async (poolConnection, commentId) => {

    const selectQuery = `SELECT comment_id as commentId, user_id as userId, article_id as articleId, content FROM comment WHERE comment_id = ${commentId};`;
    const queryResult = await poolConnection.query(selectQuery);

    const selectResult = queryResult[0];
    
    return selectResult.length !== 0 ? selectResult[0] : null;

}

/**
 * 
 * @param { mysql.PoolConnection } poolConnection 
 * @param { number } userId 
 * @param { number } articleId 
 * @param { string } content
 * @returns { Promise< { commentId: number, userId: number, articleId:number, content: string } | null > }
 */
const createComment = async (poolConnection, userId, articleId, content) => {
    
    const createQuery = `INSERT INTO comment (user_id, article_Id, content) VALUES (${userId}, '${articleId}', '${content}');`;
    const queryResult = await poolConnection.query(createQuery);
    
    const insertResult = queryResult[0];

    if (insertResult.affectedRows !== 1) return null;
    else return ({
        commentId: insertResult.insertId, userId, articleId, content
    });

}

/**
 * 
 * @param { mysql.PoolConnection } poolConnection 
 * @param { number } articleId 
 * @param { number } commentId 
 * @param { string } content 
 * @returns { Promise< boolean > }
 */
const updateCommentById = async (poolConnection, commentId, content) => {

    const updateQuery = `UPDATE comment SET content = '${content}' WHERE comment_id = ${commentId};`;
    const queryResult = await poolConnection.query(updateQuery);
    console.log(queryResult)
    const updateResult = queryResult[0];

    return updateResult.affectedRows === 1 ? true : false;

}


/**
 * 
 * @param { mysql.PoolConnection } poolConnection 
 * @param { number } commentId 
 * @returns { Promise< boolean> }
 */
 const deleteCommentById = async (poolConnection, commentId) => {
    
    const deleteQuery = `DELETE FROM comment WHERE comment_id = ${commentId};`;
    const queryResult = await poolConnection.query(deleteQuery);

    const deleteResult = queryResult[0];

    return deleteResult.affectedRows === 1 ? true : false;

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
    getComment,
    getCommentById,
    createComment,
    updateCommentById,
    createCommentLike,
    deleteCommentById,
    updateCommentLike,
    
}