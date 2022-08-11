const e = require('express');
const joi = require('joi');
const commentService = require('../services/comment.service');

/** @param { e.Request } req @param { e.Response } res @param { e.NextFunction } next */
const getComment = async (req, res, next) => {
    try {
        const result = await commentService.getComment();

        return res.status(200).json(result);
    } catch (err) {
        console.log(err);

        return res.status(500).json(err.message);
    }
};

/** @param { e.Request } req @param { e.Response } res @param { e.NextFunction } next */
const createComment = async (req, res, next) => {
    const { articleId } = req.params;
    const { content, userId } = req.body;

    try {
        await joi
            .object({
                userId: joi.number().required(),
                articleId: joi.number().required(),
                content: joi.string().min(1).max(250).required(),
            })
            .validateAsync({ userId, articleId, content });

        const result = await commentService.createComment(userId, articleId, content);

        return res.status(200).json(result);
    } catch (err) {
        console.log(err);

        return res.status(500).json(err.message);
    }
};

/** @param { e.Request } req @param { e.Response } res @param { e.NextFunction } next */
const getCommentById = async (req, res, next) => {
    const { commentId } = req.params;

    try {
        await joi
            .object({
                commentId: joi.number().required(),
            })
            .validateAsync({ commentId });

        const result = await commentService.getCommentById(commentId);

        return res.json(result);
    } catch (err) {
        return res.json(err.message);
    }
};

/** @param { e.Request } req @param { e.Response } res @param { e.NextFunction } next */
const updateCommentById = async (req, res, next) => {
    const { commentId } = req.params;
    const { content, userId } = req.body;

    try {
        await joi
            .object({
                userId: joi.number().required(),
                commentId: joi.number().required(),
                content: joi.string().min(1).max(250).required(),
            })
            .validateAsync({ userId, commentId, content });

        const result = await commentService.updateCommentById(userId, commentId, content);

        return res.json(result);
    } catch (err) {
        return res.json(err.message);
    }
};

/** @param { e.Request } req @param { e.Response } res @param { e.NextFunction } next */
const deleteCommentById = async (req, res, next) => {
    const { commentId } = req.params;
    const { userId } = req.body;

    try {
        await joi
            .object({
                userId: joi.number().required(),
                commentId: joi.number().required(),
            })
            .validateAsync({ userId, commentId });

        const result = await commentService.deleteCommentById(userId, commentId);

        return res.json(result);
    } catch (err) {
        return res.json(err.message);
    }
};

const updateCommentLike = async (req, res, next) => {
    const { commentId } = req.params;
    const { isLike, userId } = req.body;

    try {
        await joi
            .object({
                userId: joi.number().required(),
                commentId: joi.number().required(),
                isLike: joi.boolean().required(),
            })
            .validateAsync({ userId, commentId, isLike });

        const result = await commentService.updateCommentLike(userId, commentId, isLike);
        return res.status(200).json(result);
    } catch (err) {
        return res.json(err.message);
    }
};

module.exports = {
    getComment,
    createComment,
    updateCommentById,
    deleteCommentById,
    getCommentById,
    updateCommentLike,
};
