const pool = require('../../db');
const commentRepository = require('../repositories/comment.repository');
const authRepository = require('../repositories/auth.repository');

const updateCommentLike = async (userId, commentId, isLike) => {

    const poolConnection = await pool.getConnection();

    try {
        
        await poolConnection.beginTransaction();

        // userId 가 테이블에 실존하는지 체크
        const isUserExists = await authRepository.isExists(poolConnection, userId);
        if (!isUserExists) throw new Error('존재하지 않는 사용자입니다.');       

        const isCommentExists = await commentRepository.isExists(poolConnection, commentId);
        if (!isCommentExists) throw new Error('존재하지 않는 게시물입니다.'); 

        const isCommentLikeExists = await articleRepository.isLikeExists(poolConnection, userId, commentId);
        if (isCommentLikeExists) await articleRepository.updateCommentLike(poolConnection, userId, commentId, isLike);        
        else {await articleRepository.createCommentLike(poolConnection, userId, commentId, isLike );};
        
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
    updateCommentLike
}