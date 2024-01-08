
const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchemaDefinition = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
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
            default: "https://images.unsplash.com/photo-1614899099690-3bd319d25f99?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        }
    ],
    createdAt: {
        type: Date, default: Date.now
    },
    updatedAt: {
        type: Date, default: Date.now
    }
});

const Posts = mongoose.model('Post', postSchemaDefinition);
module.exports = Posts;