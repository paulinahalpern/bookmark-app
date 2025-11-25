exports.up = async function (knex) {
  await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  await knex.schema
    .createTable("url", (table) => {
      table.uuid("id").primary().defaultTo(knex.fn.uuid());
      table.string("title", 255).notNullable();
      table.string("description", 255).notNullable();
      table.string("image", 255).notNullable();
      table.string("url", 255).notNullable();
    })
    .createTable("sessions", (table) => {
      table.varchar("sid").primary();
      table.timestamp("expired");
      table.json("sess");
    });
};

exports.down = async function (knex) {
  await knex.schema.dropTable("url");
};
