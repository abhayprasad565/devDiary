require('dotenv').config();
const PORT = process.env.PORT || 8080;
const dbConnectionString = process.env.DB_CONNECTION_STRING;
module.exports = { PORT, dbConnectionString };