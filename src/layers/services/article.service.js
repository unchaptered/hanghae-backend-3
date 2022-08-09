const pool = require('../../db');
const articleRepository = require('../repositories/article.repository');
const authRepository = require('../repositories/auth.repository');

/** @param { number } userId @param { string } title @param { string } content @returns { Promise< string > } */
const createArtilce = async (userId, title, content) => {

    const poolConnection = await pool.getConnection();

    try {
        
        await poolConnection.beginTransaction();

        // userId 가 테이블에 실존하는지 체크
        const isExists = await authRepository.isExists(poolConnection, userId);
        if (!isExists) throw new Error('존재하지 않는 사용자입니다.');

        const isCreated = await articleRepository.createArticle(poolConnection, userId, title, content);
        if (isCreated === null) throw new Error('생성에 실패한 게시글입니다.');

        await poolConnection.commit();
        poolConnection.release();

        return '게시글 작성에 성공하셨습니다.';

    } catch(err) {

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
    createArtilce,
    updateArticleLike
}