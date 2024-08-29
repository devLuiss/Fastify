import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("transactions", (table) => {
    table
      .enum("type", ["credit", "debit"])
      .defaultTo("credit")
      .notNullable()
      .after("amount");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("transactions", (table) => {
    table.dropColumn("type");
  });
}
