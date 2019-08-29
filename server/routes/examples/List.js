const Example = require('../../db/queries/examples')

module.exports = async function getExampleById(ctx) {
  ctx.body = await Example.getExamples()
}
