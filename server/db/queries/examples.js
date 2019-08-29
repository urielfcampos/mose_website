const knex = require('../connection')

async function addExample(example) {
  const artefactId = await knex('artefacts')
    .returning('id')
    .insert(example.artefact)
  const statisticsId = await knex('statistic')
    .returning('id')
    .insert(example.statistics)
  const { reason, objective, fieldOfWork, author } = example
  return knex('example').insert({
    reason,
    objective,
    fieldOfWork,
    author,
    artefact_id: artefactId[0],
    statistics_id: statisticsId[0]
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
async function getExamples() {
  const examples = await knex('example').select()
  const authorsIds = []
  for (const example in examples) {
    const author = examples[example].author
    if (author !== null) {
      authorsIds.push(author)
    } else {
      examples[example].author = { fullName: 'Não possui Autor' }
    }
  }
  const authors = await knex('users')
    .select(['fullName', 'id'])
    .whereIn('id', authorsIds)
  for (const example in examples) {
    const author = examples[example].author
    for (let i = 0; i <= authors.length; i++) {
      if (authors[i] !== undefined) {
        if (authors[i].id === author) {
          examples[example].author = authors[i]
        } else {
          examples[example].author = { fullName: 'Não possui Autor' }
        }
      }
    }
  }
  return examples
}
module.exports = { addExample, getExampleById, getExamples }
