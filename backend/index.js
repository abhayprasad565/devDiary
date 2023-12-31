const express = require("express");
const app = express();
const { PORT, dbConnectionString } = require("./config");
const path = require("path");

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



// middilewares




// routes
app.use("/posts", postRoute);








app.listen(PORT, () => {
    console.log("Listening to " + PORT);
})