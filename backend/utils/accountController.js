const { Users } = require("../Schema/User.js")
const { sessionSecret } = require("../config.js")
const jwt = require("jwt-simple");
const { ExpressError } = require("./errorHandlers.js");
const passport = require('passport');



exports.login = async function (req, res) {
    const user = await Users.findOne({ username: req.body.username });
    if (!user) {
        res.status(400).json({ error: true, message: "User not found" })
    } else {
        const payload = {
            id: user.id,
            expire: Date.now() + 1000 * 60 * 60 * 24 * 7
        }
        const token = jwt.encode(payload, sessionSecret);
        res.json({ token: token, user: user, sucess: true, message: "Logged in Sucessfully" });
    }
};

exports.register = function (req, res,next) {
    Users.register(
        new Users({
            ...req.body
        }), req.body.password, function (err, msg) {
            if (err) {
               next(new ExpressError(500, "Internal Server Error"))
            } else {
                res.status(201).json({ sucess: true, message: "Registration Sucessfull" });
            }
        }
    );
};
