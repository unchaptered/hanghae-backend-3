const authService = require('../services/auth.service');
const Joi = require("joi");

const join = (req, res, next) => {

    const authDto = await Joi.object({
        
    }).validateAsync({ ... req.body} );
    
};

const login = (req, res, next) => {
};


module.exports = {
    join,
    login
}