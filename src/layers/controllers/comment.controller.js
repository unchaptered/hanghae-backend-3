const joi = require('joi');
const commentService = require('../services/comment.service');

const getComment = async (req, res, next) => {
}

const createComment = async (req, res, next) => {

    const testUserId = 1;
    const { content } = req.body;

    try {

        const result = await joi.object({
            content: joi.string().min(1).max(250).required()
        }).validateAsync({ content });

        return res.json(result);

    } catch(err) {

        return res.json(err.message);

    }

}

const updateCommentLike = async (req, res, next) => {
    const {commentId} = req.params;
    const {isLike} = req.body;

    const testUserId = 2;
    const testCommentId = 1;

    try {

        await joi.object({
            userId: joi.number().required(),
            commentId: joi.number().required(),
            isLike: joi.boolean().required()
        }).validateAsync({userId:testUserId, commentId:testArticleId, isLike});

        const result = await commentService.updateCommentLike(testUserId, testCommentId, isLike);
        return res.status(200).json(result);

    } catch (err) {

        return res.json(err.message);

    }
};

const getCommentById = async (req, res, next) => {

    const { commentId } = req.params;

    try {

        const result = await joi.object({
            commentId: joi.number().required()
        }).validateAsync({ commentId });

        return res.json(result);

    } catch(err) {

        return res.json(err.message);

    }

}

const updateCommentById = async (req, res, next) => {

    const testUserId = 10;
    const { commentId } = req.params;
    const { content } = req.body;

    try {

        const result = await joi.object({
            userId: joi.number().required(),
            articleId: joi.number().required(),
            commentId: joi.number().required(),
            content: joi.string().min(1).max(250).required()
        }).validateAsync({ userId: testUserId, articleId, commentId, content });

        return res.json(result);

    } catch(err) {

        return res.json(err.message);

    }
    
}
const deleteCommentById = async (req, res, next) => {

    const testUserId = 10;
    const { commentId } = req.params;

    try {

        const result = await joi.object({
            userId: joi.number().required(),
            articleId: joi.number().required(),
            commentId: joi.number().required()
        }).validateAsync({ userId: testUserId, articleId, commentId });

        return res.json(result);

    } catch(err) {

        return res.json(err.message);

    }
}

module.exports = {

    getComment,
    createComment,

    updateCommentById,
    deleteCommentById,
    getCommentById,

    updateCommentLike,
}