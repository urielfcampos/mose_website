exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('example')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('example').insert([
        {
          id: 1,
          reason: 'ExampleReason',
          objective: 'objective',
          fieldOfWork: 'fieldofwork',
          artefact_id: 1,
          statistics_id: 1
        }
      ])
    })
}
