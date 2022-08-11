const express = require('express');
const jwtMiddleware = require('../../modules/jwt');
const articleRouter = express.Router();

const ArticleController = require('../controllers/article.controller'); 
const articleController = new ArticleController();

articleRouter
    .route('')
    .get(articleController.getArticle)
    .post(jwtMiddleware, articleController.createArtilce);

articleRouter
    .route('/:articleId')
    .get(articleController.getArticleById)
    .put(jwtMiddleware, articleController.updateArticleById)
    .delete(jwtMiddleware, articleController.deleteArticleById);

articleRouter.put('/:articleId/toggle-like', jwtMiddleware, articleController.updateArticleLike);

module.exports = articleRouter;
