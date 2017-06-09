exports.up = async (db) => {
  await db.schema.createTable('users', (table) => {
    table.uuid('id').notNullable().primary();
    table.string('email').unique();
    table.boolean('email_confirmed').notNullable();
    table.string('password_hash', 100);
    table.string('name').notNullable();
  });
};

exports.down = async (db) => {
  await db.schema.dropTableIfExists('users');
};

module.exports.configuration = { transaction: true };
