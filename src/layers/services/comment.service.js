const pool = require('../../db');

const articleRepository = require('../repositories/article.repository');
const commentRepository = require('../repositories/comment.repository');
const authRepository = require('../repositories/auth.repository');


const createComment = async (userId, articleId, content) => {
    const poolConnection = await pool.getConnection();

    try {

        await poolConnection.beginTransaction();

        // articleId 가 테이블에 실존하는지 체크
        const isExistsArticle = await articleRepository.isExistsArticle(poolConnection, articleId);
        if (!isExistsArticle) throw new Error('존재하지 않는 게시글입니다.');

        const isCreated = await commentRepository.createArtilce(poolConnection, userId, articleId, content);
        if (isCreated === null) throw new Error('생성에 실패한 댓글입니다.');
        
         await poolConnection.commit();
        poolConnection.release();

        return '댓글 작성에 성공하셨습니다.';

    } catch(err) {

        await poolConnection.rollback();
        poolConnection.release();
        return `${err.name} : ${err.message}`;
    }
    
}
        
      
const updateCommentLike = async (userId, commentId, isLike) => {

    const poolConnection = await pool.getConnection();

    try {
        
        await poolConnection.beginTransaction();

        // userId 가 테이블에 실존하는지 체크
        const isUserExists = await authRepository.isExists(poolConnection, userId);
        if (!isUserExists) throw new Error('존재하지 않는 사용자입니다.');       

        const isCommentExists = await commentRepository.isExists(poolConnection, commentId);
        if (!isCommentExists) throw new Error('존재하지 않는 게시물입니다.'); 

        const isCommentLikeExists = await commentRepository.isLikeExists(poolConnection, userId, commentId);
        if (isCommentLikeExists) await commentRepository.updateCommentLike(poolConnection, userId, commentId, isLike);        
        else {await commentRepository.createCommentLike(poolConnection, userId, commentId, isLike );};
        
        await poolConnection.commit();
        poolConnection.release();
        
        return "좋아요/ 좋아요 취소 적용";

    } catch(err) {

        await poolConnection.rollback();
        poolConnection.release();

        console.log(err)
        return `${err.name} : ${err.message}`;

    }
    
};

module.exports = {
    createComment,
    updateCommentLike
}