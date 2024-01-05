const { ExpressError } = require("../utils/errorHandlers");
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

// validate post 
const validatePost = (req, res, next) => {
    let { error } = postSchema.validate(req.body);
    if (error) {
        throw new ExpressError(400, `Validation error : ${error.message}`)
    } else next();
}

// user
const userSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    dateOfBirth: Joi.date().required(),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
    username: Joi.string().required(),
    password: Joi.string(),
    posts: Joi.array().items(Joi.string()), // Treat posts as an array of strings (ObjectIds)
});


// validate user schema
const validateUser = (req, res, next) => {
    console.log(req.body);
    let { error } = userSchema.validate(req.body);
    if (error) {
        throw new ExpressError(400, `Validation Error: ${error.message}`)
    } else next();
}


module.exports = { validateUser, validatePost, userSchema, postSchema };