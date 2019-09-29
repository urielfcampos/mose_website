const Example = require('../../db/queries/examples')

module.exports = async function getExampleById(ctx) {
  const query = ctx.query
  if (Object.keys(query).length !== 0) {
    if (validateQuery(query)) {
      ctx.body = await Example.getExamplesByFieldAndObjective(query)
    }
  } else {
    ctx.body = await Example.getExamples()
  }
}

function validateQuery(query) {
  const validQueries = ['objective', 'fieldOfWork']
  const keys = Object.keys(query)
  for (const key of keys) {
    if (!validQueries.includes(key)) {
      return false
    }
  }
  return true
}
