exports.up = function(knex) {
  return knex.schema.createTable('artefacts', (table) => {
    table.increments()
    table.string('name')
    table.string('model')
    table.string('wayOfUse')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('artefacts')
}
