const express = require("express");
const { PORT, dbConnectionString, sessionSecret, allowedOrigins } = require("./config");
const session = require("express-session"); // Add this line
const passport = require("passport");
const LocalStrategy = require('passport-local');
const { Users } = require("./Schema/User");
const flash = require('connect-flash');
const helmet = require("helmet");
const app = express();
const { wrapAsync, ExpressError } = require("./utils/errorHandlers");
const cors = require('cors');
// initialize passport startegy
require("./utils/passportConfig")();

// Connect to database
const mongoose = require("mongoose");
async function connectToDatabase() {
    try {
        await mongoose.connect(dbConnectionString);
        console.log('Connected to the database');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}
connectToDatabase();

// https security middileware
app.use(helmet());

// cors only for allowd origins
app.use(cors({
    origin: allowedOrigins, // allowed origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
}));

// Add express-session middleware
app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
}));

// initialize passport
passport.use(new LocalStrategy(Users.authenticate()));
passport.serializeUser(Users.serializeUser());
app.use(passport.initialize());


// middilewares
app.use(flash());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// require routes
const { authRoute } = require("./Routes/authRoute");
const postRoute = require("./Routes/postRoute");
const userRoute = require("./Routes/userRoute");






// routes
app.use("/auth", authRoute);
app.use("/users", passport.authenticate('jwt', { session: false }), userRoute);
app.use("/posts", passport.authenticate('jwt', { session: false }), postRoute);



// 404 route
app.use((req, res) => {
    res.status(404).send(JSON.stringify({ error: "404 Page not found", redirect: req.path }))
})

// last error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    console.log("this is the error :" + err.message);
    res.status(err.statusCode).send(JSON.stringify({ error: true, message: err.message }));
});

// listen to port
app.listen(PORT, () => {
    console.log("Listening to " + PORT);
});
