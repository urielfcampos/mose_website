const examples = require('../../db/queries/examples')

module.exports = async function listFields(ctx) {
  ctx.body = await examples.getExampleFields()
  ctx.status = 200
}
