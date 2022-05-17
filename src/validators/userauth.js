const Joi = require('joi');
const validatorHandler = require('../middlewares/validatorHandler');

const signup = (req, res, next) => {
    const schema = Joi.object().keys({
        first_name: Joi.string()
            .trim()
            .alphanum()
            .min(3)
            .max(50)
            .required(),
        last_name: Joi.string()
            .trim()
            .alphanum()
            .min(3)
            .max(50)
            .required(),
        email: Joi.string()
            .trim()
            .email()
            .required(),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')),
            phone: Joi.string().trim().min(11).max(14).required(),
            address: Joi.string().trim(),
            is_admin: Joi.boolean()  
    
        });
    validatorHandler(req, res, next, schema);
};

const signin = (req, res, next) => {
    const schema = Joi.object().keys({
        email: Joi.string()
            .trim()
            .email()
            .required(),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
    });
    validatorHandler(req, res, next, schema);
};

const passwordcheck = (req,res,next)=>{
const schema = Joi.object().keys({
password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
});
validatorHandler(req,res,next, schema);
};

module.exports = {
    signup,
    signin,
    passwordcheck
};