const Example = require('../../db/queries/examples')

module.exports = async function getExampleById(ctx) {
  const { id } = ctx.params
  ctx.body = await Example.getExampleById(id)
}
