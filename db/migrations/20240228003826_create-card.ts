import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('cards', (table) => {
    table.uuid('id').primary()

    table.string('title')
    table.string('subtitle')
    table.string('description')

    table.uuid('user_id').unsigned().references('users.id').onDelete('SET NULL')

    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('cards')
}
