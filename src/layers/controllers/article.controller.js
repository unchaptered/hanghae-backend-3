const joi = require('joi');
const articleService = require('../services/article.service');

const getArticle = async (req, res, next) => {
}

const createArtilce = async (req, res, next) => {

    const testUserId = 1;
    const { title, content } = req.body;

    try {

        const result = await joi.object({
            title: joi.string().min(1).max(50).required(),
            content: joi.string().min(1).max(250).required()
        }).validateAsync({ title, content });

        return res.json(result);

    } catch(err) {

        return res.json(err.message);

    }

}


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

};

module.exports = {
    getArticle, 
    createArtilce, 
    getArticleById, 
    updateArticleById, 
    deleteArticleById, 
    updateArticleLike
}