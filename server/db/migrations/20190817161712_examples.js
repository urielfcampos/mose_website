exports.up = function(knex) {
  return knex.schema.createTable('example', (table) => {
    table.increments()
    table.string('reason')
    table.string('objective')
    table.string('fieldOfWork')
    table.integer('author').unsigned()
    table.integer('artefact_id').unsigned()
    table.integer('statistics_id').unsigned()
    table
      .foreign('artefact_id')
      .references('id')
      .inTable('artefacts')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    table
      .foreign('statistics_id')
      .references('id')
      .inTable('statistic')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('example')
}
