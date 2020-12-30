// IMPORTS
const Joi = require('@hapi/joi');


// REGISTER VALIDATION
const registerValidation = data => {

    const registerSchema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().min(4).required().email(),
        password: Joi.string().min(6).required()
    });


    return registerSchema.validate(data);

}


// LOGIN VALIDATION
const loginValidation = data => {

    const loginSchema = Joi.object({
        email: Joi.string().min(4).required().email(),
        password: Joi.string().min(6).required()
    });


    return loginSchema.validate(data);

}


// EXPORT THE VALIDATION FUNCTIONS
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
