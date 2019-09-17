const knex = require('../connection')

async function addExample(example) {
  const artefactIds = []
  const indicatorIds = []
  for (const artefact in example.artefacts) {
    try {
      const artefactId = await knex('artefacts')
        .returning('id')
        .insert(example.artefacts[artefact])
      artefactIds.push(artefactId[0])
    } catch (error) {
      throw new Error(error)
    }
  }
  for (const indicator in example.indicators) {
    try {
      const indicatorId = await knex('indicator')
        .returning('id')
        .insert(example.indicators[indicator])
      indicatorIds.push(indicatorId[0])
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
  // Tratar o objeto do knex...
  exampleId = exampleId[0]

  for (const artefactId of artefactIds) {
    try {
      await knex('example_artefact').insert({
        example_id: exampleId,
        artefact_id: artefactId
      })
    } catch (error) {
      throw new Error(error)
    }
  }

  for (const indicatorId of indicatorIds) {
    try {
      await knex('example_indicator').insert({
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

async function getExamples() {
  const examples = await knex.raw(`SELECT e.id as example_id, e.objective, e.fieldOfWork,a.id as artefact_id,
  a.artefact_name, a.model,a.wayOfUse, a.artefact_reason
  FROM example as e
  JOIN example_artefact as ea on e.id = ea.example_id
  JOIN artefacts as a on ea.artefact_id = a.id
  `)
  // eslint-disable-next-line no-console
  console.log(examples.rows)
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
