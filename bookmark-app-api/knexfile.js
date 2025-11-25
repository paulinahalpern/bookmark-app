const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  client: "pg",
  connection: process.env.DB_URL || {
    user: "postgres",
    database: "postgres",
  },
  migrations: {
    directory: "./migrations",
  },
};
