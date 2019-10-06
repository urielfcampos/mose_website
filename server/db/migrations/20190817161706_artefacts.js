exports.up = function(knex) {
  return knex.schema.createTable('artefacts', (table) => {
    table.increments()
    table.string('artefact_name')
    table.string('model', 30000)
    table.string('wayOfUse', 30000)
    table.string('artefact_reason', 30000)
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('artefacts')
}
