require('dotenv').config();
const PORT = process.env.PORT || 8080;
const dbConnectionString = process.env.DB_CONNECTION_STRING;
const sessionSecret = process.env.SESSION_SECRETS;
const allowedOrigins = process.env.ALLOWED_ORIGINS;
module.exports = { PORT, dbConnectionString, sessionSecret, allowedOrigins };