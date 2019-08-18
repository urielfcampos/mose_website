exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('artefacts')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('artefacts').insert([
        {
          id: 1,
          name: 'exampleArtefact',
          model: 'exampleModel',
          wayOfUse: 'exampleWayOfUse'
        }
      ])
    })
}
