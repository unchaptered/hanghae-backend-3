const express = require('express');
const commentController = require('../controllers/comment.controller');

const commentRouter = express.Router();

commentRouter.post('', commentController.Comment);

commentRouter.put('/:commentId/toggle-like', commentController.updateCommentLike);

module.exports = commentRouter;