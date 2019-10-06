exports.up = function(knex) {
  return knex.schema.createTable('indicator', (table) => {
    table.increments()
    table.string('indicator_name')
    table.string('wayOfCollection', 30000)
    table.string('wayOfAnalysis', 30000)
    table.string('indicator_reason', 30000)
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('indicator')
}
