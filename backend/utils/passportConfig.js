const { Users } = require("../Schema/User.js");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const { sessionSecret } = require("../config.js");
const { ExpressError } = require("./errorHandlers.js");
const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const LocalStrategy = require('passport-local').Strategy;

const params = {
    secretOrKey: sessionSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

module.exports = function () {
    // jwt strategy 
    const strategy = new Strategy(params, async function (payload, done) {
        //console.log(payload);
        try {
            const user = await Users.findById(payload.id)
            if (!user) {
                return done(null, false, "User not found");
            } else if (payload.expire <= Date.now()) {
                return done(null, false, "Token Expired");
            } else {
                return done(null, user);
            }
        }
        catch (error) {
            done(error, null);
        }
    });
    passport.use(strategy);
    //local strategy
    passport.use(new LocalStrategy(
        async (username, password, done) => {
            // console.log(username, password);
            try {
                const user = await Users.findOne({ username });
                if (!user || !user.validPassword(password)) {
                    throw new Error("Invalid Credentials");
                }
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    ));
    return { initialize: function () { return passport.initialize() } };
};