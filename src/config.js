require("dotenv").config();

module.exports = {
  system: {
    port: process.env.PORT,
  },
  database: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
  },
  session: {
    secret: process.env.SESSION_SECRET,
    cookieAge: 1000 * 60 * 60,
  },
};
