const knex = require('../connection')

async function addExample(example) {
  const artefactId = await knex('artefacts')
    .returning('id')
    .insert(example.artefact)
  const indicatorId = await knex('indicator')
    .returning('id')
    .insert(example.indicators)
  const { objective, fieldOfWork, author } = example
  return knex('example').insert({
    objective,
    fieldOfWork,
    author,
    artefact_id: artefactId[0],
    indicator_id: indicatorId[0]
  })
}
async function updateExample(example) {
  await knex('artefacts')
    .update(example.artefact)
    .where('id', example.artefact_id)
  await knex('indicator')
    .update(example.indicator)
    .where('id', example.indicator_id)
  return knex('example')
    .update({
      objective: example.objective,
      fieldOfWork: example.fieldOfWork
    })
    .then((result) => {
      return result
    })
}
function getExampleById(id) {
  return knex('example')
    .join('artefacts', 'artefacts.id', 'example.artefact_id')
    .join('indicator', 'indicator.id', 'example.indicator_id')
    .select()
    .where('example.id', id)
    .then((result) => {
      return result
    })
}

function getExamples() {
  return knex('example')
    .join('artefacts', 'artefacts.id', 'example.artefact_id')
    .join('indicator', 'indicator.id', 'example.indicator_id')
    .join('users', 'users.id', 'example.author')
    .select(
      'example.id',
      'indicator.indicator_name',
      'artefacts.artefact_name',
      'users.fullName',
      'example.fieldOfWork',
      'example.objective'
    )
    .then((result) => {
      return result
    })
}
module.exports = { addExample, getExampleById, getExamples, updateExample }
