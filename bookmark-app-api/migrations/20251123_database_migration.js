exports.up = async function (knex) {
  await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  await knex.schema
    .createTable("bookmarks", (table) => {
      table.uuid("id").primary().defaultTo(knex.fn.uuid());
      table.string("title", 255).notNullable();
      table.string("description", 255).notNullable();
      table.string("image", 255).notNullable();
      table.string("url", 255).notNullable();
      table.string("user_id").notNullable();
    })
    .createTable("users", (table) => {
      table.uuid("id").primary().defaultTo(knex.fn.uuid());
      table.string("name", 255).notNullable();
      table.string("username", 255);
      table.string("hashed_password", 255);
      table.string("salt", 255);
      table.string("provider", 255).notNullable();
      table.string("provider_id", 255).notNullable();
      table.timestamp("created_at");
    })
    .createTable("sessions", (table) => {
      table.varchar("sid").primary();
      table.timestamp("expired");
      table.json("sess");
    });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("sessions");
  await knex.schema.dropTable("bookmarks");
  await knex.schema.dropTable("users");
};
