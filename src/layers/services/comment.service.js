const { DatabaseProvider } = require('../../modules/_.loader');

const ArticleRepository = require('../repositories/article.repository');
const CommentRepository = require('../repositories/comment.repository');
const AuthRepository = require('../repositories/auth.repository');

class CommentService {
    articleRepository;
    commentRepository;
    authRepository;
    databaseProvider;

    constructor() {
        this.articleRepository = new ArticleRepository();
        this.commentRepository = new CommentRepository();
        this.authRepository = new AuthRepository();
        this.databaseProvider = new DatabaseProvider();
    }

    /**
     *
     * @returns { Promise< { commentId: number, userId: number, articleId: number, content: string } | string >}
     */
    getComment = async () => {
        const poolConnection = await this.databaseProvider.getConnection();

        try {
            await poolConnection.beginTransaction();

            const result = await this.commentRepository.getComment(poolConnection);

            await poolConnection.commit();
            poolConnection.release();

            return result;
        } catch (err) {
            await poolConnection.rollback();
            poolConnection.release();

            return `${err.name} : ${err.message}`;
        }
    };

    /**
     *
     * @param { number } userId
     * @param { number } articleId
     * @param { string } content
     * @returns { Promise< { commentId: number, userId: number, articleId: number, content: string } | string >}
     */
    createComment = async (userId, articleId, content) => {
        const poolConnection = await this.databaseProvider.getConnection();

        try {
            await poolConnection.beginTransaction();

            // articleId, userId 가 테이블에 실존하는지 체크
            const isExists = await this.authRepository.isExists(poolConnection, userId);
            if (!isExists) throw new Error('존재하지 않는 사용자입니다.');

            const getArticleById = await this.articleRepository.getArticleById(
                poolConnection,
                articleId,
            );
            if (!getArticleById) throw new Error('존재하지 않는 게시글입니다.');

            const createComment = await this.commentRepository.createComment(
                poolConnection,
                userId,
                articleId,
                content,
            );
            if (createComment === null) throw new Error('생성에 실패한 댓글입니다.');

            await poolConnection.commit();
            poolConnection.release();

            return createComment;
        } catch (err) {
            await poolConnection.rollback();
            poolConnection.release();

            return `${err.name} : ${err.message}`;
        }
    };

    /**
     *
     * @param { number } commentId
     * @returns { Promise< { commentId: number, userId: number, comment: number, content: string } | string >}
     */
    getCommentById = async (commentId) => {
        const poolConnection = await this.databaseProvider.getConnection();

        try {
            await poolConnection.beginTransaction();

            // articleId 가 테이블에 실존하는지 체크
            const result = await this.commentRepository.getCommentById(poolConnection, commentId);
            if (result === null) throw new Error('존재하지 않는 댓글입니다.');

            await poolConnection.commit();
            poolConnection.release();

            return result;
        } catch (err) {
            console.log(err);

            await poolConnection.rollback();
            poolConnection.release();

            return `${err.name} : ${err.message}`;
        }
    };

    /**
     *
     * @param { number } userId
     * @param { number } commentId
     * @param { number } articleId
     * @param { string } content
     * @returns { Promise< { commentId: number, userId: number, articleId: number, content: string } | string > }
     */
    updateCommentById = async (userId, commentId, articleId, content) => {
        const poolConnection = await this.databaseProvider.getConnection();

        try {
            await poolConnection.beginTransaction();

            // userId 가 테이블에 실존하는지 체크
            const result = await this.commentRepository.getCommentById(poolConnection, commentId);
            if (result === null) throw new Error('존재하지 않는 댓글입니다.');
            if (result.userId !== userId) throw new Error('댓글 작성자가 아닌 유저입니다.');

            const isUpdated = await this.commentRepository.updateCommentById(
                poolConnection,
                commentId,
                articleId,
                content,
            );
            if (!isUpdated) throw new Error('알 수 없는 에러로 댓글 수정에 실패하였습니다.');

            await poolConnection.commit();
            poolConnection.release();

            return { commentId, userId, articleId, content };
        } catch (err) {
            console.log(err);

            await poolConnection.rollback();
            poolConnection.release();

            return `${err.name} : ${err.message}`;
        }
    };

    /**
     *
     * @param { number } userId
     * @param { number } articleId
     * @param { number } commentId
     * @returns { Promise< { commentId: number, userId: number, articleId: number, content: string } | string > }
     */
    deleteCommentById = async (userId, commentId) => {
        const poolConnection = await this.databaseProvider.getConnection();

        try {
            await poolConnection.beginTransaction();

            // userId 가 테이블에 실존하는지 체크
            const result = await this.commentRepository.getCommentById(poolConnection, commentId);
            if (result === null) throw new Error('존재하지 않는 댓글입니다.');
            if (result.userId !== userId) throw new Error('댓글 작성자가 아닌 유저입니다.');

            const isDeleted = await this.commentRepository.deleteCommentById(
                poolConnection,
                commentId,
            );
            if (!isDeleted) throw new Error('알 수 없는 에러로 댓글 삭제에 실패하였습니다.');

            await poolConnection.commit();
            poolConnection.release();

            return result;
        } catch (err) {
            console.log(err);

            await poolConnection.rollback();
            poolConnection.release();

            return `${err.name} : ${err.message}`;
        }
    };

    updateCommentLike = async (userId, commentId, isLike) => {
        const poolConnection = await this.databaseProvider.getConnection();

        try {
            await poolConnection.beginTransaction();

            // userId 가 테이블에 실존하는지 체크
            const isUserExists = await this.authRepository.isExists(poolConnection, userId);
            if (!isUserExists) throw new Error('존재하지 않는 사용자입니다.');

            const isCommentExists = await this.commentRepository.isExists(
                poolConnection,
                commentId,
            );
            if (!isCommentExists) throw new Error('존재하지 않는 게시물입니다.');

            const isCommentLikeExists = await this.commentRepository.isLikeExists(
                poolConnection,
                userId,
                commentId,
            );
            if (isCommentLikeExists)
                await this.commentRepository.updateCommentLike(
                    poolConnection,
                    userId,
                    commentId,
                    isLike,
                );
            else {
                await this.commentRepository.createCommentLike(
                    poolConnection,
                    userId,
                    commentId,
                    isLike,
                );
            }

            await poolConnection.commit();
            poolConnection.release();

            return '좋아요/ 좋아요 취소 적용';
        } catch (err) {
            await poolConnection.rollback();
            poolConnection.release();

            console.log(err);
            return `${err.name} : ${err.message}`;
        }
    };
}

module.exports = CommentService;
