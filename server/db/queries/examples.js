const knex = require('../connection')

async function addExample(example) {
  const artefactIds = []
  const indicatorIds = []
  for (const artefact in example.artefacts) {
    try {
      const artefactId = await knex('artefacts')
        .returning('id')
        .insert(example.artefacts[artefact])
      artefactIds.push(artefactId)
    } catch (error) {
      throw new Error(error)
    }
  }
  for (const indicator in example.indicators) {
    try {
      const indicatorId = await knex('indicator')
        .returning('id')
        .insert(example.indicators[indicator])
      indicatorIds.push(indicatorId)
    } catch (error) {
      throw new Error(error)
    }
  }
  const { objective, fieldOfWork, author } = example
  let exampleId
  try {
    exampleId = await knex('example')
      .returning('id')
      .insert({
        objective,
        fieldOfWork,
        author
      })
  } catch (error) {
    throw new Error(error)
  }

  // eslint-disable-next-line no-console
  console.log(exampleId, artefactIds, indicatorIds)
  for (const artefactId in artefactIds) {
    try {
      await knex('example-artefact').insert({
        example_id: exampleId,
        artefact_id: artefactId
      })
    } catch (error) {
      throw new Error(error)
    }
  }

  for (const indicatorId in indicatorIds) {
    try {
      await knex('example-indicator').insert({
        example_id: exampleId,
        indicator_id: indicatorId
      })
    } catch (error) {
      throw new Error(error)
    }
  }
}
async function updateExample(example) {
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
