const Joi = require("joi");

const signUpValidation = {
    body: Joi.object().required().keys({
        userName: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().pattern(new RegExp("^[A-Z0-9][a-z0-9]{3,}")),
        cPassword: Joi.ref("password"),
    })
};
const signInValidation = {
    body: Joi.object().required().keys({
        email: Joi.string().required().email(),
        password: Joi.string().pattern(new RegExp("^[A-Z0-9][a-z0-9]{3,}")),
    })
};

module.exports = {
    signUpValidation,
    signInValidation,
}