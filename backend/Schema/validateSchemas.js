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
console.log(postSchema.validate(
    { "author": "Charlie Brown", "genre": "Food", "subGenre": "Recipes", "title": "Delicious Desserts Collection", "description": "Indulge your sweet tooth with these mouthwatering dessert recipes from around the globe.", "images": ["image-url-7", "image-url-8"], "createdAt": "2024-01-01T05:41:30.805Z", "updatedAt": "2024-01-01T05:41:30.805Z" }
))
module.exports = { postSchema };