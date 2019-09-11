exports.up = function(knex) {
  return knex.schema.createTable('example_indicator', (table) => {
    table.increments()
    table.integer('example_id').unsigned()
    table.integer('indicator_id').unsigned()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('example_indicator')
}
