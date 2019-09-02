exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('artefacts')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('artefacts').insert([
        {
          id: 0,
          artefact_name: 'exampleArtefact',
          model: 'exampleModel',
          wayOfUse: 'exampleWayOfUse'
        }
      ])
    })
}
