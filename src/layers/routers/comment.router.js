const express = require('express');
const commentController = require('../controllers/comment.controller');
const jwtMiddleware = require('../../modules/jwt');

const commentRouter = express.Router();

commentRouter.route('')
    .get(commentController.getComment)
    .post(commentController.createComment);

commentRouter.route('/:articleId')
    .get(commentController.getCommentById)
    .put(commentController.updateCommentById)
    .delete(commentController.deleteCommentById);

commentRouter.put('/:commentId/toggle-like', jwtMiddleware, commentController.updateCommentLike);

module.exports = commentRouter;