const pool = require('../../db');
const articleRepository = require('../repositories/article.repository');
const authRepository = require('../repositories/auth.repository');

/**
 * @param { number } userId
 * @param { string } title
 * @param { string } content
 * @returns { Promise< { articleId: number, userId: number, title: string, content: string } >}
 */
const createArticle = async (userId, title, content) => {

    const poolConnection = await pool.getConnection();

    try {
        
        await poolConnection.beginTransaction();

        // userId 가 테이블에 실존하는지 체크
        const isExists = await authRepository.isExists(poolConnection, userId);
        if (!isExists) throw new Error('존재하지 않는 사용자입니다.');

        const cretedArticle = await articleRepository.createArticle(poolConnection, userId, title, content);
        if (isCreated === null) throw new Error('생성에 실패한 게시글입니다.');

        await poolConnection.commit();
        poolConnection.release();

        return cretedArticle;

    } catch(err) {

        await poolConnection.rollback();
        poolConnection.release();

        return `${err.name} : ${err.message}`;

    }
    
}

/**
 * @param { number } articleId 
 */
const getArticleById = (articleId) => {

}

/**
 * @param { number } userId 
 * @param { number } articleId 
 * @param { string } title 
 * @param { string } content 
 */
const updateArticleById = (userId, articleId, title, content) => {

}

/**
 * @param { number } userId 
 * @param { number } articleId 
 */
const deleteArticleById = (userId, articleId) => {

}


module.exports = {

    createArticle,
    getArticleById,
    updateArticleById,
    deleteArticleById,

}