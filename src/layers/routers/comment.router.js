const express = require('express');
const commentController = require('../controllers/comment.controller');

const commentRouter = express.Router();

userRouter.post('', commentController.Comment);

module.exports = commentRouter;