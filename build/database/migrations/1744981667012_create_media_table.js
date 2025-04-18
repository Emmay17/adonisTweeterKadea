import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'medias';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.string('url').notNullable();
            table.string('type').notNullable();
            table.string('size').nullable();
            table.integer('poste_id')
                .unsigned()
                .references('id_post')
                .inTable('postes')
                .onDelete('CASCADE');
            table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now());
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1744981667012_create_media_table.js.map