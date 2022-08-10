const pool = require('../../db');
const articleRepository = require('../repositories/article.repository');
const authRepository = require('../repositories/auth.repository');


/**
 * 
 * @returns { Promise< { articleId: number, userId: number, title: string, content: string } | string >}
 */
const getArticle = async () => {

    const poolConnection = await pool.getConnection();

    try {
        
        await poolConnection.beginTransaction();

        const result = await articleRepository.getArticle(poolConnection);

        await poolConnection.commit();
        poolConnection.release();

        return result;

    } catch(err) {

        await poolConnection.rollback();
        poolConnection.release();

        return `${err.name} : ${err.message}`;

    }

}

/**
 * 
 * @param { number } userId
 * @param { string } title
 * @param { string } content
 * @returns { Promise< { articleId: number, userId: number, title: string, content: string } | string >}
 */
const createArticle = async (userId, title, content) => {

    const poolConnection = await pool.getConnection();

    try {
        
        await poolConnection.beginTransaction();

        // userId 가 테이블에 실존하는지 체크
        const isExists = await authRepository.isExists(poolConnection, userId);
        if (!isExists) throw new Error('존재하지 않는 사용자입니다.');

        const cretedArticle = await articleRepository.createArticle(poolConnection, userId, title, content);
        if (cretedArticle === null) throw new Error('생성에 실패한 게시글입니다.');

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
 * 
 * @param { number } articleId
 * @returns { Promise< { articleId: number, userId: number, title: string, content: string } | string >}
 */
const getArticleById = async (articleId) => {

    const poolConnection = await pool.getConnection();

    try {
        
        await poolConnection.beginTransaction();

        // userId 가 테이블에 실존하는지 체크
        const result = await articleRepository.getArticleById(poolConnection,articleId);
        if (result === null) throw new Error('존재하지 않는 게시글입니다.'); 
        
        await poolConnection.commit();
        poolConnection.release();

        return result;

    } catch(err) {

        console.log(err);

        await poolConnection.rollback();
        poolConnection.release();

        return `${err.name} : ${err.message}`;

    }

}

/**
 * 
 * @param { number } userId 
 * @param { number } articleId 
 * @param { string } title 
 * @param { string } content 
 * @returns { Promise< { articleId: number, userId: number, title: string, content: string } | string > }
 */
const updateArticleById = async (userId, articleId, title, content) => {
    const poolConnection = await pool.getConnection();

    try {
        
        await poolConnection.beginTransaction();

        // userId 가 테이블에 실존하는지 체크
        const result = await articleRepository.getArticleById(poolConnection,articleId);
        if (result === null) throw new Error('존재하지 않는 게시글입니다.');
        if (result.userId !== userId) throw new Error('게시글 작성자가 아닌 유저입니다.');
        
        const isUpdated = await articleRepository.updateArticleById(poolConnection, articleId, title, content);
        if (!isUpdated) throw new Error('알 수 없는 에러로 게시글 수정에 실패하였습니다.');

        await poolConnection.commit();
        poolConnection.release();

        return ({ articleId, userId, title, content });

    } catch(err) {

        console.log(err);

        await poolConnection.rollback();
        poolConnection.release();

        return `${err.name} : ${err.message}`;

    }

}

/**
 * 
 * @param { number } userId 
 * @param { number } articleId 
 * @returns { Promise< { articleId: number, userId: number, title: string, content: string } | string > }
 */
const deleteArticleById = async (userId, articleId) => {

    const poolConnection = await pool.getConnection();

    try {
        
        await poolConnection.beginTransaction();

        // userId 가 테이블에 실존하는지 체크
        const result = await articleRepository.getArticleById(poolConnection,articleId);
        if (result === null) throw new Error('존재하지 않는 게시글입니다.'); 
        if (result.userId !== userId) throw new Error('게시글 작성자가 아닌 유저입니다.');
        
        const isDeleted = await articleRepository.deleteArticleById(poolConnection, articleId);
        if (!isDeleted) throw new Error('알 수 없는 에러로 게시글 삭제에 실패하였습니다.');

        await poolConnection.commit();
        poolConnection.release();

        return result;

    } catch(err) {

        console.log(err);

        await poolConnection.rollback();
        poolConnection.release();

        return `${err.name} : ${err.message}`;

    }

}

const updateArticleLike = async (userId, articleId, isLike) => {

    const poolConnection = await pool.getConnection();

    try {

        await poolConnection.beginTransaction();

        // userId 가 테이블에 실존하는지 체크
        const isUserExists = await authRepository.isExists(poolConnection, userId);
        if (!isUserExists) throw new Error('존재하지 않는 사용자입니다.');       

        const isArticleExists = await articleRepository.isExists(poolConnection, articleId);
        if (!isArticleExists) throw new Error('존재하지 않는 게시물입니다.'); 

        const isArticleLikeExists = await articleRepository.isLikeExists(poolConnection, userId, articleId);
        if (isArticleLikeExists) await articleRepository.updateArticleLike(poolConnection, userId, articleId, isLike);        
        else {await articleRepository.createArticleLike(poolConnection, userId, articleId, isLike );};

        await poolConnection.commit();
        poolConnection.release();

        return "좋아요/ 좋아요 취소 적용";

    } catch(err) {

        await poolConnection.rollback();
        poolConnection.release();

        console.log(err)
        return `${err.name} : ${err.message}`;

    }

}

module.exports = {

    getArticle,
    createArticle,
    getArticleById,
    updateArticleById,
    deleteArticleById,
    updateArticleLike

}