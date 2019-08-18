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
function getExampleById(id) {
  return knex('example')
    .select('*')
    .leftJoin('artefacts', 'example.artefact_id', 'artefacts.id')
    .leftJoin('statistic', 'example.statistics_id', 'statistic.id')
}
module.exports = { addExample, getExampleById }
