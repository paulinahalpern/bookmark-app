const Knex = require("knex");

const knex = Knex({
  client: "pg",
  connection: process.env.DB_URL,
});

knex.raw("SELECT 1;").then(() => {
  console.log("Connected to PostgreSQL");
});

module.exports = knex;
