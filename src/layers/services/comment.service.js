const pool = require('../../db');
const articleRepository = require('../repositories/article.repository');
const commentRepository = require('../repositories/comment.repository');

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

module.exports = {
    createComment
}