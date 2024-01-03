const router = require("express").Router();
// error handlers
const { wrapAsync, ExpressError } = require("../utils/errorHandlers");
// import models
const Users = require("../Schema/User");
const { userSchema } = require("../Schema/validateSchemas");

// validate User 
const validateUser = (req, res, next) => {
    let { error } = userSchema.validate(req.body);
    if (error) {
        throw new ExpressError(400, error)
    } else next();
}

router.get("/", wrapAsync(async (req, res) => {
    let users = await Users.find({});
    res.send(JSON.stringify(users));
}));

// get user details
router.get("/:username", wrapAsync(async (req, res) => {
    let { username } = req.params
    let user = await Users.findOne({ username: username });
    console.log(user);
    res.send(JSON.stringify(user));
}))

// new user route
router.post("/", validateUser, wrapAsync(async (req, res) => {
    let userData = new Users(req.body);
    await userData.save();
}));

// edit user route 
router.put("/:username", validateUser, wrapAsync(async (req, res) => {
    const { username } = req.params;
    let user = await Users.findOne({ username: username });
    if (req.body.posts.length > 0) throw new ExpressError(400, "Bad request Send proper data");
    user.overwrite({ ...req.body });
    await user.save();
    res.send("user updated sucessfully")
}));


// delete user route 
router.delete("/:username", wrapAsync(async (req, res) => {
    const { username } = req.params;
    let user = await Users.findOneAndDelete({ username: username });
    res.redirect("/users");
}))




module.exports = router;
