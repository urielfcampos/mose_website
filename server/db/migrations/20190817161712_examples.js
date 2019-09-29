exports.up = function(knex) {
  return knex.schema.createTable('example', (table) => {
    table.increments()
    table.string('objective')
    table.string('fieldOfWork')
    table.integer('author').unsigned()
    table.unique(['objective', 'fieldOfWork'])
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('example')
}
