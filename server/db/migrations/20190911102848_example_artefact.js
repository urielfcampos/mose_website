exports.up = function(knex) {
  return knex.schema.createTable('example_artefact', (table) => {
    table.increments()
    table.integer('example_id').unsigned()
    table.integer('artefact_id').unsigned()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('example_artefact')
}
