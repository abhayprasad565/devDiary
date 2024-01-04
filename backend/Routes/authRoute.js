const authRoute = require("express").Router();
const passport = require('passport');
const { Users } = require('../Schema/User');
const { validateUser } = require("../Schema/validateSchemas");
const { wrapAsync, ExpressError } = require("../utils/errorHandlers");



// Middleware for routes accesible only via authentication
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}
// userAuth
authRoute.post("/login", (req, res, next) => {
    // authenticate user middileware
    passport.authenticate('local', (err, user, info) => {
        // handle error
        if (err) {
            return next(err);
        } // handle wrong data sent
        if (!user) {
            // Authentication failure
            req.flash('error', 'Invalid username or password'); // Use connect-flash for flash messages
            console.log(info);
            return res.status(401).json({ error: 'Authorization Failed' });
        } // handle logn error
        req.logIn(user, (loginErr) => {
            if (loginErr) {
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            // Authentication success
            return res.status(200).json({ success: true, redirectUrl: `/users/${user.username}` });
        });
    })(req, res, next); // call the function after defining
});
// user logout
authRoute.get('/logout', (req, res) => {
    req.logOut((err) => {
        if (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json({ success: true, redirectUrl: `/login` });

    });

})
// register user
authRoute.post("/register", validateUser, wrapAsync(async (req, res) => {
    const userDetails = validateUser(req.body).value;
    const { password } = userDetails;
    console.log(password);
    const User = new Users(userDetails);
    await Users.register(User, password);
    console.log(`User registered: ${userDetails.username}`);
    res.status(201).json({ success: true, message: 'Registration successful' });
}));

module.exports = { authRoute, isLoggedIn };