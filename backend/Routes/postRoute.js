const router = require("express").Router();
// error handlers
const { wrapAsync, ExpressError } = require("../utils/errorHandlers");
// import models
const Posts = require("../Schema/Posts");
const { validatePost, userSchema } = require("../Schema/validateSchemas");
const { authorizeUser } = require('./authRoute');

// func
const findTrendingPosts = async () => {

    const tenDaysAgoTimestamp = Date.now() - (15 * 24 * 60 * 60 * 1000);
    const trending = await Posts.aggregate([
        { $match: { createdAt: { $gte: new Date(tenDaysAgoTimestamp) } } },
        { $group: { _id: "$genre" } },
        { $limit: 5 }
    ]).exec();
    return trending;
}


// routes 


// show all posts
router.get("/", async (req, res, next) => {
    try {
        const allPosts = await Posts.find({}).populate('author', 'firstName lastName username',).sort({ createdAt: 1 });
        const trending = await findTrendingPosts();
        res.json({ sucess: true, posts: allPosts, genres: trending });
    } catch (error) {
        console.log(error.message);
        next(new ExpressError(500, "Internal server error"));
    }
});
// search query 
router.get("/search", async (req, res) => {
    let searchParam = req.query.search;
    let searchCategory = req.query.category;
    let query = null;
    console.log(req.query, searchCategory, searchParam);
    if (searchCategory) {
        query = {
            $or: [
                { title: { $regex: searchCategory, $options: 'i' } }, // Case-insensitive title search
                { genre: { $regex: searchCategory, $options: 'i' } }, // Case-insensitive genre search
                { subGenre: { $regex: searchCategory, $options: 'i' } }, // Case-insensitive subGenre search
            ]
        };
    }
    else if (searchParam) {
        query = {
            $or: [
                { title: { $regex: searchParam, $options: 'i' } }, // Case-insensitive title search
                { description: { $regex: searchParam, $options: 'i' } }, // Case-insensitive description search
                { genre: { $regex: searchParam, $options: 'i' } }, // Case-insensitive genre search
                { subGenre: { $regex: searchParam, $options: 'i' } }, // Case-insensitive subGenre search
            ]
        };
    }

    const result = await Posts.find(query);
    console.log(result);
    const trending = await findTrendingPosts();
    res.json({ sucess: true, posts: result, genres: trending });
});
// show specific post
router.get("/:id", wrapAsync(async (req, res, next) => {
    try {
        const { id } = req.params;
        const post = await Posts.findOne({ _id: id }).populate('author', 'firstName lastName username createdAt about',);
        res.status(200).json({ sucess: true, post: post });
    }
    catch (error) {
        next(new ExpressError(500, error.message))
    }
}));

// new post route
router.post("/", authorizeUser, wrapAsync(async (req, res, next) => {
    try {
        console.log(req.body)
        const postData = new Posts(userSchema.validate(req.body.post).value);
        if (postData)
            await postData.save();
        else throw new ExpressError(400, "Properly send data");
        console.log(postData);
        res.status(200).json({ sucess: true, post: postData, message: "Post Saaved Sucessfully" });
    } catch (error) {
        next(new ExpressError(400, error.message))
    }
}));
// update post route
router.put("/:id", validatePost, wrapAsync(async (req, res) => {
    const { id } = req.params;
    let post = await Posts.findOne({ _id: id });
    post.overwrite({ ...req.body });
    await post.save();
    res.status(200).redirect(`/posts/${id}`);
}));
// delete post route
router.delete("/:id", authorizeUser, wrapAsync(async (req, res) => {
    console.log(req.body);
    const { id } = req.params;
    let post = await Posts.findByIdAndDelete(id);
    res.status(200).json({ sucess: true, message: "post Deleted" });
}));





module.exports = router;