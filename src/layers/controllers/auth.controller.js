const authService = require('../services/auth.service');
const Joi = require("joi");

const join = (req, res, next) => {

    const authDto = await Joi.object({
        nickname : Joi.toString().min(2).max(15).required(),
        password : Joi.toString().min(4).max(20).required(),
        confirm : Joi.toString().min(4).max(20).required(),
    }).validateAsync({ ... req.body} );
    
    if (password !== confirm) {
        return res.status(400).send({
            erroMessage : "패스워드와 패스워드 확인이 일치하지 않습니다."

        });
    }

    const IS_EXIST = await 
};

const login = (req, res, next) => {
};


module.exports = {
    join,
    login
}