const express = require("express");
const app = express();
const { PORT, dbConnectionString } = require("./config");

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

// require routes
const postRoute = require("./Routes/postRoute");
const userRoute = require("./Routes/userRoute");


// middilewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// routes
app.use("/posts", postRoute);
app.use("/users", userRoute);







app.listen(PORT, () => {
    console.log("Listening to " + PORT);
})