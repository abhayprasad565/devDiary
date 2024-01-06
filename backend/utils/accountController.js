const { Users } = require("../Schema/User.js")
const { sessionSecret } = require("../config.js")
const jwt = require("jwt-simple");
const { ExpressError } = require("./errorHandlers.js");

exports.login = async function (req, res) {
    const user = await Users.findOne({ username: req.body.username });
    if (!user) {
        console.log("Error");
    } else {
        const payload = {
            id: user.id,
            expire: Date.now() + 1000 * 60 * 60 * 24 * 7
        }
        const token = jwt.encode(payload, sessionSecret)
        res.json({ token: token })
    }
};

exports.register = function (req, res) {
    Users.register(
        new Users({
            ...req.body
        }), req.body.password, function (err, msg) {
            if (err) {
                throw new ExpressError(500, "Internal Server Error")
            } else {
                res.status(201).json({ sucess: true, message: "Registration Sucessfull" });
            }
        }
    );
};
