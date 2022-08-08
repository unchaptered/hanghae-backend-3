const joi = require('joi');
const articleService = require('../services/article.service');

const getArticle = async (req, res, next) => {
}

const createArtilce = async (req, res, next) => {

    const test_user_id = 1;
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

const updateArticleById = async (req, res, next) => {
}
const deleteArticleById = async (req, res, next) => {
}

const getArticleById = async (req, res, next) => {
}

module.exports = {

    getArticle,
    createArtilce,

    updateArticleById,
    deleteArticleById,
    getArticleById

}