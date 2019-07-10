const User = require('../../db/queries/users')

module.exports = async function listUsers(ctx) {
  const { id } = ctx.params
  ctx.body = await User.getUsersById(id)
}
