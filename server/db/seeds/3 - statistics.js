exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('statistic')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('statistic').insert([
        {
          id: 1,
          name: 'exampleStatistics',
          wayOfCollection: 'ExampleCollection',
          wayOfAnalysis: 'exampleAnalysis'
        }
      ])
    })
}
