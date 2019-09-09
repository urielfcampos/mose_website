exports.up = function(knex) {
  return knex.schema.createTable('example', (table) => {
    table.increments()
    table.string('objective')
    table.string('fieldOfWork')
    table.integer('author').unsigned()
    table.integer('artefact_id').unsigned()
    table.integer('indicator_id').unsigned()
    table
      .foreign('artefact_id')
      .references('id')
      .inTable('artefacts')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    table
      .foreign('indicator_id')
      .references('id')
      .inTable('indicator')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('example')
}
