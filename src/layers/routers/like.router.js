const express = require('express');
const likeController = require('../controllers/like.controller');

const userRouter = express.Router();

userRouter.post('/join', likeController.join);

module.exports = userRouter;