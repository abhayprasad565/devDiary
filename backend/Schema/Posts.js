const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchemaDefinition = new Schema({
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        default: "All",
    },
    subGenre: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: [
        {
            type: String,
            required: true
        }
    ],
    createdAt: {
        type: Date, default: Date.now
    },
    updatedAt: {
        type: Date, default: Date.now
    }
});

const Posts = new mongoose.model('Post', postSchemaDefinition);
module.exports = Posts;