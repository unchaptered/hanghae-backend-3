const express = require('express');
const commentController = require('../controllers/comment.controller');

const commentRouter = express.Router();

userRouter.post('/comment', commentController.Comment);

module.exports = commentRouter;