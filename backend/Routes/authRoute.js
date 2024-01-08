const authRoute = require("express").Router();
const passport = require('passport');
const { Users } = require('../Schema/User');
const { userSchema, validateUser } = require("../Schema/validateSchemas");
const { wrapAsync, ExpressError } = require("../utils/errorHandlers");
const { login, register } = require("../utils/accountController");

const authenticateUser = (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        console.log(err, user, info);
        if (err) {
            next(new ExpressError(502, "Internal Server Error"));
        }
        if (!user) {
            next(new ExpressError(400, info.message));
        }
        // Authentication successful, call the next middleware
        req.login(user, (loginErr) => {
            if (loginErr) {
                next(new ExpressError(500, "Internal server Error"));
            }
            // Call the next middleware
            next();
        });
    })(req, res, next);
}


// userAuth
authRoute.post("/login", authenticateUser, login);
// user logout
authRoute.get('/logout', (req, res) => {
    req.logOut((err) => {
        if (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
    res.status(201).json({ sucess: true, message: "logout sucess" });
})
// register user
authRoute.post("/register", validateUser, register);

authRoute.get("/check_login", passport.authenticate('jwt', { session: false }), async (req, res) => {
    const userData = await Users.findOne({ username: req.user.username });
    // destructure and send only relevant data
    const userDataResponse = userData ? (({ _id, __v, ...rest }) => rest)(userData.toObject()) : null;
    return res.status(200).json({ sucess: true, user: userDataResponse });
});


module.exports = { authRoute };