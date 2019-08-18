exports.up = function(knex) {
  return knex.schema.createTable('statistic', (table) => {
    table.increments()
    table.string('name')
    table.string('wayOfCollection')
    table.string('wayOfAnalysis')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('statistic')
}
