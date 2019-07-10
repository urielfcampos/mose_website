exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments()
    table.string('username').notNullable()
    table.string('password').notNullable()
    table.string('role').notNullable()
    table.string('fullName').notNullable()
    table
      .string('email')
      .notNullable()
      .unique()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('users')
}
