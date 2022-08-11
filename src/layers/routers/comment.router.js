const express = require('express');
const commentController = require('../controllers/comment.controller');
const jwtMiddleware = require('../../modules/jwt');

const commentRouter = express.Router();

commentRouter.route('')
    .get(commentController.getComment)
    

commentRouter.route('/:articleId')
    .post(jwtMiddleware, commentController.createComment);


commentRouter.route('/:commentId')    
    .put(jwtMiddleware, commentController.updateCommentById)
    .delete(jwtMiddleware, commentController.deleteCommentById);


commentRouter.put('/:commentId/toggle-like', jwtMiddleware, commentController.updateCommentLike);


module.exports = commentRouter;