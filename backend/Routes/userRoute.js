const router = require("express").Router();
// error handlers
const { wrapAsync, ExpressError } = require("../utils/errorHandlers");
// import models
const { Users } = require("../Schema/User");
const { authorizeUser } = require("./authRoute");



// get user details
router.get("/:username", wrapAsync(async (req, res) => {
    const { username } = req.params
    const user = await Users.findOne({ username: username }).populate({
        path: 'posts',
        options: { sort: { createdAt: 1 } }, // Sorting posts by createdAt in ascending order
        select: '-__v',// remove _v feild
    }).select('-__v ');
    if (!user) throw new ExpressError(400, "User Not Found");
    res.send(JSON.stringify({ sucess: true, user: user }));
}))


// edit user route 
router.put("/:username", authorizeUser, wrapAsync(async (req, res) => {
    const { username } = req.params;
    let user = await Users.findOne({ username: username });
    let { firstName, lastName, dateOfBirth, email, about } = req.body;
    console.log(req.body);
    if (!dateOfBirth) dateOfBirth = user.dateOfBirth;
    // Only update the fields that are present in the request body
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (dateOfBirth) user.dateOfBirth = dateOfBirth;
    if (email) user.email = email;
    if (about) user.about = about;
    await user.save();
    // console.log(user);
    res.json({ sucess: true, message: "User updated sucessfully", user: user })
}));


// delete user route 
router.delete("/:username", wrapAsync(async (req, res) => {
    const { username } = req.params;
    let user = await Users.findOneAndDelete({ username: username });
    res.redirect("/users");
}))


module.exports = router;
