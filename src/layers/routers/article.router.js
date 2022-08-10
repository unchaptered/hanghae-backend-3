const express = require('express');

const articleController = require('../controllers/article.controller');
const jwtmiddleware = require('../../modules/jwt');
const articleRouter = express.Router();

articleRouter.route('')
    .get(articleController.getArticle)
    .post(jwtmiddleware , articleController.createArtilce);

articleRouter.route('/:articleId')
    .get(articleController.getArticleById)
    .put(articleController.updateArticleById)
    .delete(articleController.deleteArticleById);


articleRouter.put('/:articleId/toggle-like', articleController.updateArticleLike);

module.exports = articleRouter;