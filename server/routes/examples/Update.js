const Examples = require('../../db/queries/examples')
const errors = require('../../../shared/errors')

module.exports = async function updateExamples(ctx) {
  const { id } = ctx.params
  const payload = ctx.request.body
  const example = await Examples.getExampleById(id)
  if (example === null) {
    ctx.status = 404
    ctx.body = { code: errors.NOT_FOUND }
  }
  ctx.body = await Examples.updateExample(payload)
}
