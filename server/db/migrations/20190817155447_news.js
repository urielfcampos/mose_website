exports.up = function(knex) {
  return knex.schema.createTable('news', (table) => {
    table.increments()
    table.string('title')
    table.string('bodyText', 30000)
    table.date('data')
    table.integer('author').unsigned()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('news')
}
