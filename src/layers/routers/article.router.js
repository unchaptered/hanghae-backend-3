const express = require('express');

const articleController = require('../controllers/article.controller');
const jwtMiddleware = require('../../modules/jwt');
const articleRouter = express.Router();

articleRouter.route('')
    .get(articleController.getArticle)
    .post(jwtMiddleware , articleController.createArtilce);

articleRouter.route('/:articleId')
    .get(articleController.getArticleById)
    .put(jwtMiddleware, articleController.updateArticleById)
    .delete(jwtMiddleware, articleController.deleteArticleById);


articleRouter.put('/:articleId/toggle-like', articleController.updateArticleLike);

module.exports = articleRouter;