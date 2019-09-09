const Examples = require('../../db/queries/examples')
const errors = require('../../../shared/errors')
module.exports = async function deleteExample(ctx) {
  const { id } = ctx.params
  const example = await Examples.getExampleById(id)
  if (example === null) {
    ctx.status = 404
    ctx.body = { code: errors.NOT_FOUND }
    return
  }
  ctx.body = await Examples.deleteExample(id)
}
