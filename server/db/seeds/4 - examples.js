exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('example')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('example').insert([
        {
          id: 0,
          objective: 'objective',
          fieldOfWork: 'fieldofwork',
          artefact_id: 0,
          indicator_id: 0,
          author: 1
        }
      ])
    })
}
