const { Users } = require("../Schema/User.js");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const { sessionSecret } = require("../config.js");
const { ExpressError } = require("./errorHandlers.js");
const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;

const params = {
    secretOrKey: sessionSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

module.exports = function () {
    const strategy = new Strategy(params, async function (payload, done) {
        console.log(payload);
        const user = await Users.findById(payload.id)
        if (!user) {
            return done(new ExpressError(401, "UserNotFound"), null);
        } else if (payload.expire <= Date.now()) {
            return done(new ExpressError(401, "TokenExpired"), null);
        } else {
            return done(null, user);
        }
    });

    passport.use(strategy);

    return { initialize: function () { return passport.initialize() } };
};