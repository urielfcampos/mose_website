exports.up = function(knex) {
  return knex.schema.createTable('events', (table) => {
    table.increments()
    table.string('name')
    table.string('summary')
    table.string('local')
    table.time('time')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('events')
}
