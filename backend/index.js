const express = require("express");
const { PORT, dbConnectionString, sessionSecret, allowedOrigins } = require("./config");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const MongoStore = require('connect-mongo');
const { Users } = require("./Schema/User");
const flash = require('connect-flash');
const helmet = require("helmet");
const app = express();
const { wrapAsync, ExpressError } = require("./utils/errorHandlers");
const cors = require('cors');

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

// cors 
app.use(cors({
    origin: allowedOrigins, // allowed origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
}))

// configure express session
// secret - cookie secret password
// resave- resave session evertime is false
// saveUninitialized - save when session not present
app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: dbConnectionString, // MongoDB connection URL
        collectionName: 'sessions', // Collection name for storing sessions
        ttl: 14 * 24 * 60 * 60, // Session TTL (optional)
    }),
}));

// auth middilewares
// configure passport
// Initialize Passport and restore authentication state from the session
app.use(passport.initialize());
app.use(passport.session());
// initialize local strategy
passport.use(new LocalStrategy(Users.authenticate()));
//Serialize user
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());



// middilewares
app.use(flash());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// require routes
const { authRoute, isLoggedIn } = require("./Routes/authRoute");
const postRoute = require("./Routes/postRoute");
const userRoute = require("./Routes/userRoute");






// routes
app.use("/", authRoute);
app.use("/posts", isLoggedIn, postRoute);
app.use("/users", isLoggedIn, userRoute);



app.use((req, res) => {
    res.status(404).json({ error: "404 Page not found", redirect: "/" })
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong", redirect: "/" });
});

app.listen(PORT, () => {
    console.log("Listening to " + PORT);
});
