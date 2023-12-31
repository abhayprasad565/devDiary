const router = require("express").Router();
// import models
const Posts = require("../Schema/Posts");
async function getpost() {
    const post = await Posts.find({});
    return post;
}
getpost();

router.get("/", async (req, res) => {
    const post = await getpost();
    res.send(JSON.stringify(post));
})



module.exports = router;