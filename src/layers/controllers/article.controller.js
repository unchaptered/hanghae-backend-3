const e = require('express');
const joi = require('joi');
const articleService = require('../services/article.service');

/** @param { e.Request } req @param { e.Response } res @param { e.NextFunction } next */
const getArticle = async (req, res, next) => {

    try {
            
        const result = await articleService.getArticle();

        return res.status(200).json(result);

    } catch(err) {

        console.log(err);

        return res.status(500).json(err.message);

    }

}

/** @param { e.Request } req @param { e.Response } res @param { e.NextFunction } next */
const createArtilce = async (req, res, next) => {

    const { title, content, userid } = req.body;

    try {

        await joi.object({
            userid: joi.number().required(),
            title: joi.string().min(1).max(50).required(),
            content: joi.string().min(1).max(250).required()
        }).validateAsync({ title, content, userid });

        const result = await articleService.createArticle(userid, title, content);

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

        await joi.object({
            articleId: joi.number().required()
        }).validateAsync({ articleId });

        const result = await articleService.getArticleById(articleId);

        return res.json(result);

    } catch(err) {

        return res.json(err.message);

    }

}

/** @param { e.Request } req @param { e.Response } res @param { e.NextFunction } next */
const updateArticleById = async (req, res, next) => {

    const testUserId = 1;
    const { articleId } = req.params;
    const { title, content } = req.body;

    try {

        await joi.object({
            userId: joi.number().required(),
            articleId: joi.number().required(),
            title: joi.string().min(1).max(50).required(),
            content: joi.string().min(1).max(250).required()
        }).validateAsync({ userId: testUserId, articleId, title, content });

        const result = await articleService.updateArticleById(testUserId, articleId, title, content);

        return res.json(result);

    } catch(err) {

        return res.json(err.message);

    }
    
}

/** @param { e.Request } req @param { e.Response } res @param { e.NextFunction } next */
const deleteArticleById = async (req, res, next) => {

    const testUserId = 1;
    const { articleId } = req.params;

    try {

        await joi.object({
            userId: joi.number().required(),
            articleId: joi.number().required()
        }).validateAsync({ userId: testUserId, articleId });

        const result = await articleService.deleteArticleById(testUserId, articleId);
        
        return res.json(result);

    } catch(err) {

        return res.json(err.message);

    }
}


const updateArticleLike = async (req, res, next) => {
    const {articleId} = req.params;
    const {isLike} = req.body;    

    const testUserId = 2;
    const testArticleId = 1;

    try {

        await joi.object({
            userId: joi.number().required(),
            articleId: joi.number().required(),
            isLike: joi.boolean().required()
        }).validateAsync({userId:testUserId, articleId:testArticleId, isLike});

        const result = await articleService.updateArticleLike(testUserId, testArticleId, isLike);
        return res.status(200).json(result);

    } catch (err) {

        return res.json(err.message);

    }
    
};

module.exports = {
    getArticle, 
    createArtilce, 
    getArticleById, 
    updateArticleById, 
    deleteArticleById, 
    updateArticleLike
}