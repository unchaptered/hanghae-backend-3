const express = require('express');
const AuthController = require('../controllers/auth.controller');
const authController = new AuthController();
const authRouter = express.Router();

authRouter.post('/join', authController.join).post('/login', authController.login);

module.exports = authRouter;
