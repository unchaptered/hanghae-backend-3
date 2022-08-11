const mysql = require('mysql2');

class ArticleRepository {
    constructor() {}

    isExists = async (poolConnection, articleId) => {
        const isExistsQuery = `SELECT * FROM article WHERE article_id = ${articleId};`;
        const queryResult = await poolConnection.query(isExistsQuery);

        const selectResult = queryResult[0];

        return selectResult.length !== 0 ? true : false;
    };

    isLikeExists = async (poolConnection, userId, articleId) => {
        const isExistsQuery = `SELECT * FROM article_like WHERE article_id = ${articleId} AND user_Id = ${userId};`;
        const queryResult = await poolConnection.query(isExistsQuery);

        const selectResult = queryResult[0];

        return selectResult.length !== 0 ? true : false;
    };

    /**
     *
     * @param { mysql.poolConnection } poolConnection
     * @returns { Promise< Array<{ articleId: number, userId: number, title: string, content: string }> > }
     */
    getArticle = async (poolConnection) => {
        const selectQuery = `SELECT article_id as articleId, user_id as userId, title, content FROM article LIMIT 100`;
        const queryResult = await poolConnection.query(selectQuery);

        const selectResult = queryResult[0];

        return selectResult;
    };
    /**
     *
     * @param { mysql.poolConnection } poolConnection
     * @param { number } articleId
     * @returns { Promise< { articleId: number, userId: number, title: string, content: string } | null >}
     */
    getArticleById = async (poolConnection, articleId) => {
        const selectQuery = `SELECT article_id as articleId, user_id as userId, title, content FROM article WHERE article_id = ${articleId};`;
        const queryResult = await poolConnection.query(selectQuery);

        const selectResult = queryResult[0];

        return selectResult.length !== 0 ? selectResult[0] : null;
    };

    /**
     *
     * @param { mysql.PoolConnection } poolConnection
     * @param { number } userId
     * @param { string } title
     * @param { string } content
     * @returns { Promise< { articleId: number, userId: number, title: string, content: string } | null > }
     */
    createArticle = async (poolConnection, userId, title, content) => {
        const createQuery = `INSERT INTO article (user_id, title, content) VALUES (${userId}, '${title}', '${content}');`;
        const queryResult = await poolConnection.query(createQuery);

        const insertResult = queryResult[0];

        if (insertResult.affectedRows !== 1) return null;
        else
            return {
                articleId: insertResult.insertId,
                userId,
                title,
                content,
            };
    };

    /**
     *
     * @param { mysql.PoolConnection } poolConnection
     * @param { number } articleId
     * @param { string } title
     * @param { string } content
     * @returns { Promise< boolean > }
     */
    updateArticleById = async (poolConnection, articleId, title, content) => {
        const updateQuery = `UPDATE article SET title = '${title}', content = '${content}' WHERE article_id = ${articleId};`;
        const queryResult = await poolConnection.query(updateQuery);

        const updateResult = queryResult[0];

        return updateResult.affectedRows === 1 ? true : false;
    };

    createArticleLike = async (poolConnection, userId, articleId, isLike) => {
        const createQuery = `INSERT INTO article_like (user_id, article_id, is_liked) VALUES (${userId}, ${articleId}, ${isLike});`;
        const queryResult = await poolConnection.query(createQuery);

        const insertResult = queryResult[0];

        if (insertResult.affectedRows !== 1) return null;
        else
            return {
                likeId: insertResult.insertId,
                userId,
                articleId,
                isLike,
            };
    };

    /**
     *
     * @param { mysql.PoolConnection } poolConnection
     * @param { number } articleId
     * @returns { Promise< boolean> }
     */
    deleteArticleById = async (poolConnection, articleId) => {
        const deleteQuery = `DELETE FROM article WHERE article_id = ${articleId};`;
        const queryResult = await poolConnection.query(deleteQuery);

        const deleteResult = queryResult[0];

        return deleteResult.affectedRows === 1 ? true : false;
    };

    updateArticleLike = async (poolConnection, userId, articleId, isLike) => {
        const updateQuery = `UPDATE article_like SET is_liked = ${isLike} WHERE user_Id = ${userId} AND article_Id = ${articleId};`;
        const queryResult = await poolConnection.query(updateQuery);

        const insertResult = queryResult[0];

        if (insertResult.affectedRows !== 1) return null;
        else
            return {
                likeId: insertResult.insertId,
                userId,
                articleId,
                isLike,
            };
    };
}

module.exports = ArticleRepository;
