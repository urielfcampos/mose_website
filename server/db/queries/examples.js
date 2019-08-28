const knex = require('../connection')

async function addExample(example) {
  const artefactId = await knex('artefacts')
    .returning('id')
    .insert(example.artefact)
  const statisticsId = await knex('statistics')
    .returning('id')
    .insert(example.statistics)
  const { reason, objective, fieldOfWork } = example
  return knex('example').insert({
    reason,
    objective,
    fieldOfWork,
    artefact_id: artefactId,
    statistics_id: statisticsId
  })
}
async function getExampleById(id) {
  const example = await knex('example')
    .select('*')
    .where('id', id)
  const artefact = await knex('artefacts')
    .select()
    .where('id', example[0].artefact_id)
  const statistic = await knex('statistic')
    .select()
    .where('id', example[0].statistics_id)
  const assembledExample = { example, artefact, statistic }
  return assembledExample
}
module.exports = { addExample, getExampleById }
