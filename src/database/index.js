const mysql = require("mysql2/promise");
const config = require("../config");

const connectionOptions = {
  host: config.database.host,
  port: config.database.port,
  database: config.database.database,
  user: config.database.user,
  password: config.database.password,
};

const pool = mysql.createPool(connectionOptions);

const connectToMySQL = async () => {
  try {
    await pool.getConnection();
    console.log("Database connected!");
  } catch (err) {
    console.log("Database connection error!");
    process.exit(1);
  }
};

connectToMySQL().then();

module.exports = pool;
