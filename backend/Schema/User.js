
const mongoose = require("mongoose");
const { Schema } = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');
const Posts = require("./Posts");
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    about: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        immutable: true
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    },
    username: {
        type: String,
        unique: true,
        required: true,
        immutable: true,
    },
    posts: [
        {
            type: Schema.Types.ObjectId, ref: 'Post',
        },
    ]
});
userSchema.plugin(passportLocalMongoose);


// mongoose middileware to delete data when this q is called
userSchema.post("findOneAndDelete", async (user) => {
    // delete all posts in the  array
    if (user) await Posts.deleteMany({ posts: { $in: user.posts } })
})

const Users = mongoose.model("User", userSchema);
module.exports = { Users };