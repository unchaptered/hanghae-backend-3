const express = require('express');
const articleController = require('../controllers/article.controller');

const articleRouter = express.Router();

articleRouter.route('')
    .get(articleController.getArticle)
    .post(articleController.createArtilce);

articleRouter.route('/:articleId')
    .get(articleController.getArticleById)
    .put(articleController.updateArticleById)
    .delete(articleController.deleteArticleById);

module.exports = articleRouter;