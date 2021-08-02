const Joi = require('@hapi/joi');

const companyValidation = companyData => {
    const schema = Joi.object({
        compName:Joi.string()
        .min(3)
        .max(255)
        .required(),
        compEmail:Joi.string()
        .min(3)
        .max(255)
        .email()
        .required(),
        compAddress:Joi.string()
        .min(3)
        .max(255)
        .required(),
        compStocks:Joi.number()
        .max(255),
        UserId:Joi.string()
        .max(255)
    })
    return schema.validate(companyData);
}

module.exports.companyValidation = companyValidation;