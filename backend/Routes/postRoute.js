const router = require("express").Router();
// error handlers
const { wrapAsync, ExpressError } = require("../utils/errorHandlers");
// import models
const Posts = require("../Schema/Posts");
const { validatePost } = require("../Schema/validateSchemas");




// routes 


// show all posts
router.get("/", async (req, res, next) => {
    try {
        const allPosts = await Posts.find({}).populate('author', 'firstName lastName username',).sort({ createdAt: 1 });
        const tenDaysAgoTimestamp = Date.now() - (15 * 24 * 60 * 60 * 1000);
        const trending = await Posts.aggregate([
            { $match: { createdAt: { $gte: new Date(tenDaysAgoTimestamp) } } },
            { $group: { _id: "$genre" } },
            { $limit: 5 }
        ]).exec();
        res.json({ sucess: true, posts: allPosts, genres: trending });
    } catch (error) {
        console.log(error.message);
        next(new ExpressError(500, "Internal server error"));
    }

});
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