exports.up = function(knex) {
  return knex.schema.createTable('indicator', (table) => {
    table.increments()
    table.string('indicator_name')
    table.string('wayOfCollection')
    table.string('wayOfAnalysis')
    table.string('indicator_reason')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('indicator')
}
