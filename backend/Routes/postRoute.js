const router = require("express").Router();
// error handlers
const { wrapAsync, ExpressError } = require("../utils/errorHandlers");
// import models
const Posts = require("../Schema/Posts");
const { postSchema } = require("../Schema/validateSchemas");

// validate post 
const validatePost = (req, res, next) => {
    let { error } = postSchema.validate(req.body);
    if (error) {
        throw new ExpressError(400, error)
    } else next();
}


// routes 


// show all posts
router.get("/", wrapAsync(async (req, res) => {
    const allPosts = await Posts.find({});
    res.send(allPosts);
}));
// show specific post
router.get("/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const post = await Posts.findOne({ _id: id });
    res.status(200).send(JSON.stringify(post));
}));

// new post route
router.post("/", validatePost, wrapAsync(async (req, res) => {
    const postData = new Posts(req.body);
    await postData.save();
    res.status(200).redirect(`posts/${postData._id}`);
}));
// update post route
router.put("/:id", validatePost, wrapAsync(async (req, res) => {
    const { id } = req.params;
    let post = await Posts.findOne({ _id: id });
    post.overwrite({ ...req.body });
    await post.save();
    res.status(200).edirect(`/posts/${id}`);
}));
// delete post route
router.delete("/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    let post = await Posts.findByIdAndDelete(id);
    res.status(200).redirect("/posts");
}));





module.exports = router;