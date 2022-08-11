const Joi = require('joi');

const AuthService = require('../services/auth.service');

class AuthController {
    authService;

    constructor() {
        this.authService = new AuthService();
    }

    /**
     * 회원가입 API
     * @param {Request} req
     * @param {Response} res
     * @param {*} next
     * @returns
     */
    join = async (req, res, next) => {
        try {
            const userDto = await Joi.object({
                nickname: Joi.string().min(2).max(15).required(),
                password: Joi.string().min(4).max(20).required(),
                confirm: Joi.string().min(4).max(20).required(),
            }).validateAsync({ ...req.body });

            const result = await this.authService.join(userDto);

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
    login = async (req, res, next) => {
        try {
            const userDto = await Joi.object({
                nickname: Joi.string().min(2).max(15).required(),
                password: Joi.string().min(4).max(20).required(),
            }).validateAsync({ ...req.body });

            const result = await this.authService.login(userDto);
            return res.status(200).json(result);
        } catch (err) {
            console.log(err);
            return res.status(400).json(err.message);
        }
    };
}

module.exports = AuthController;
