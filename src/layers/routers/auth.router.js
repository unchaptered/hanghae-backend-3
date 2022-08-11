const express = require('express');
const authController = require('../controllers/auth.controller');

const authRouter = express.Router();

authRouter.post('/join', authController.join).post('/login', authController.login);

module.exports = authRouter;
