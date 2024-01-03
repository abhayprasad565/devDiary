
const mongoose = require("mongoose");
const { Schema } = mongoose;
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
    location: {
        type: String,
        default: "Anonymous",
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
})

// delete all posts when delete user is called
// mongoose middileware to delete data when this q is called
userSchema.post("findOneAndDelete", async (user) => {
    // delete all posts in the  array
    if (user) await Posts.deleteMany({ posts: { $in: user.posts } })
})

const Users = mongoose.model("User", userSchema);
module.exports = Users;