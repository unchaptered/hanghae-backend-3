const mysql = require('mysql2');

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

module.exports = {
    createArticle
}