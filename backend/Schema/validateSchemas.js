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
});
// user

const userSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    location: Joi.string().default('Anonymous'),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
    username: Joi.string().required(),
    posts: Joi.array().items(Joi.string()), // Treat posts as an array of strings (ObjectIds)
});

module.exports = { userSchema, postSchema };