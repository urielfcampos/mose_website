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
  try {
    await knex('artefacts')
      .update({
        artefact_name: example.artefact_name,
        artefact_reason: example.artefact_reason,
        model: example.model,
        wayOfUse: example.wayOfUse
      })
      .where('id', example.artefact_id)
    await knex('indicator')
      .update({
        indicator_name: example.indicator_name,
        indicator_reason: example.indicator_reason,
        wayOfAnalysis: example.wayOfAnalysis,
        wayOfCollection: example.wayOfCollection
      })
      .where('id', example.indicator_id)
    return knex('example')
      .update({
        objective: example.objective,
        fieldOfWork: example.fieldOfWork
      })
      .where('id', example.id)
      .then((result) => {
        return result
      })
  } catch (error) {
    throw new Error(error)
  }
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
function deleteExample(id) {
  return knex('example')
    .del()
    .where('id', id)
    .then((result) => {
      return result
    })
}

module.exports = {
  addExample,
  getExampleById,
  getExamples,
  updateExample,
  deleteExample
}
