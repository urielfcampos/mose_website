exports.up = function(knex) {
  return knex.schema.createTable('events', (table) => {
    table.increments()
    table.string('name')
    table.string('summary', 30000)
    table.string('local')
    table.time('time')
    table.date('date')
    table.integer('author').unsigned()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('events')
}
