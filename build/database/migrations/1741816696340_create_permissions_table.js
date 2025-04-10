import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'permissions';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('idpermission').primary();
            table.string('labelle', 20).notNullable().unique();
            table.string('description').notNullable();
            table.timestamp('created_at', { useTz: true }).defaultTo(this.raw('CURRENT_TIMESTAMP'));
            table.timestamp('updated_at', { useTz: true }).defaultTo(this.raw('CURRENT_TIMESTAMP'));
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1741816696340_create_permissions_table.js.map