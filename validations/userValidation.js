const Joi = require('@hapi/joi');

const userRegisterValidation = registrationData => {
    const schema = Joi.object({
        name: Joi.string().
            min(2)
            .max(255)
            .required(),
        email: Joi.string().
            min(6)
            .max(255)
            .email()
            .required(),
        password: Joi.string().
            min(6)
            .max(1024)
            .required(),
    });
    return schema.validate(registrationData);
}

const loginValidation = loginData => {
    const schema = Joi.object({
        email: Joi.string()
        .email()
        .max(255)
        .min(6)
        .required(),
        password: Joi.string()
        .max(1024)
        .min(6)
        .required()
    });
    return schema.validate(loginData);
}

module.exports.loginValidation = loginValidation;
module.exports.userRegisterValidation = userRegisterValidation;