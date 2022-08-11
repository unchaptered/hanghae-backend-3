const Joi = require('joi');

const authService = require('../services/auth.service');

/**
 * 회원가입 API
 * @param {Request} req
 * @param {Response} res
 * @param {*} next
 * @returns
 */
const join = async (req, res, next) => {
    try {
        const userDto = await Joi.object({
            nickname: Joi.string().min(2).max(15).required(),
            password: Joi.string().min(4).max(20).required(),
            confirm: Joi.string().min(4).max(20).required(),
        }).validateAsync({ ...req.body });

        const result = await authService.join(userDto);

        return res.status(200).json(result);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err.message);
    }
};

/**
 * 로그인 API
 * @param {Request} req
 * @param {Response} res
 * @param {*} next
 * @returns
 */
const login = async (req, res, next) => {
    try {
        const userDto = await Joi.object({
            nickname: Joi.string().min(2).max(15).required(),
            password: Joi.string().min(4).max(20).required(),
        }).validateAsync({ ...req.body });

        const result = await authService.login(userDto);
        return res.status(200).json(result);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err.message);
    }
};

module.exports = {
    join,
    login,
};
