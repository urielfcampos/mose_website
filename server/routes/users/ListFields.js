const User = require('../../db/queries/users')

module.exports = async function listFields(ctx) {
  const query = User
  ctx.body = await query.getUserFields()
  ctx.status = 200
}
