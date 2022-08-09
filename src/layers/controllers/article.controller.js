const e = require('express');
const joi = require('joi');
const articleService = require('../services/article.service');

/** @param { e.Request } req @param { e.Response } res @param { e.NextFunction } next */
const getArticle = async (req, res, next) => {
}

/** @param { e.Request } req @param { e.Response } res @param { e.NextFunction } next */
const createArtilce = async (req, res, next) => {

    const testUserId = 1;
    const { title, content } = req.body;

    try {

        await joi.object({
            userId: joi.number().required(),
            title: joi.string().min(1).max(50).required(),
            content: joi.string().min(1).max(250).required()
        }).validateAsync({ userId: testUserId, title, content });

        const result = await articleService.createArtilce(testUserId, title, content);

        return res.status(200).json(result);

    } catch(err) {

        console.log(err);

        return res.status(500).json(err.message);

    }

}


/** @param { e.Request } req @param { e.Response } res @param { e.NextFunction } next */
const getArticleById = async (req, res, next) => {

    const { articleId } = req.params;

    try {

        const result = await joi.object({
            articleId: joi.number().required()
        }).validateAsync({ articleId });

        return res.json(result);

    } catch(err) {

        return res.json(err.message);

    }

}

/** @param { e.Request } req @param { e.Response } res @param { e.NextFunction } next */
const updateArticleById = async (req, res, next) => {

    const testUserId = 10;
    const { articleId } = req.params;
    const { title, content } = req.body;

    try {

        const result = await joi.object({
            userId: joi.number().required(),
            articleId: joi.number().required(),
            title: joi.string().min(1).max(50).required(),
            content: joi.string().min(1).max(250).required()
        }).validateAsync({ userId: testUserId, articleId, title, content });

        return res.json(result);

    } catch(err) {

        return res.json(err.message);

    }
    
}

/** @param { e.Request } req @param { e.Response } res @param { e.NextFunction } next */
const deleteArticleById = async (req, res, next) => {

    const testUserId = 10;
    const { articleId } = req.params;

    try {

        const result = await joi.object({
            userId: joi.number().required(),
            articleId: joi.number().required()
        }).validateAsync({ userId: testUserId, articleId });

        return res.json(result);

    } catch(err) {

        return res.json(err.message);

    }
}


const updateArticleLike = (req, res, next) => {
    const {articleId} = req.params;
    const {isLike} = req.body;

    console.log(req.params, articleId, isLike);
};

module.exports = {
    getArticle, 
    createArtilce, 
    getArticleById, 
    updateArticleById, 
    deleteArticleById, 
    updateArticleLike
}