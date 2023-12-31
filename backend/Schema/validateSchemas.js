const Joi = require("joi");
const postSchema = Joi.object({
    author: Joi.string().required(),
    genre: Joi.string().required(),
    subGenre: Joi.string(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    images: Joi.array().items(Joi.string()),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
})
module.exports = { postSchema };