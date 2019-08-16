exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments()
    table.string('password').notNullable()
    table.string('role').notNullable()
    table.string('fullName').notNullable()
    table
      .string('email')
      .notNullable()
      .unique()
    table.string('state').notNullable()
    table.string('phoneNumber').notNullable()
    table.string('fieldOfWork').notNullable()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('users')
}
