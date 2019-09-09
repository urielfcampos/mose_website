exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('indicator')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('indicator').insert([
        {
          id: 0,
          indicator_name: 'exampleStatistics',
          wayOfCollection: 'ExampleCollection',
          wayOfAnalysis: 'exampleAnalysis',
          indicator_reason: 'reason'
        }
      ])
    })
}
