import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'postes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_post')
      table.integer('id_user').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('content')
      table.integer('parent').unsigned().nullable().references('id_post').inTable('postes').onDelete('SET NULL')
      table.integer('likes').defaultTo(0)
      table.integer('partage').defaultTo(0)
      table.timestamp('created_at').defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}