const authService = require('../services/auth.service');
const Joi = require("joi");

const join = async (req, res, next) => {

    try {
        const joinDto = await Joi.object({
            nickname: Joi.string().min(2).max(15).required(),
            password: Joi.string().min(4).max(20).required(),
            confirm: Joi.string().min(4).max(20).required()
        }).validateAsync( {...req.body} );

        res.send("d")

        if (password !== confirm) {
            return res.status(400).send({
                erroMessage: "패스워드와 패스워드 확인이 일치하지 않습니다."

            });
        };
        //const IS_EXIST = await
        const CREATE_USER = `
            INSERT INTO user 
        `
        //const user = 
        
    } catch (err) {
        return res.json(err.message);
    }


};

const login = async (req, res, next) => {

    const authDto = await Joi.object({
        nickname: Joi.toString().min(2).max(15).required(),
        password: Joi.toString().min(4).max(20).required(),
    }).validateAsync({ ...req.body });

    return;
};


module.exports = {
    join,
    login
}