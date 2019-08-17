const User = require('../../db/queries/users')

module.exports = async function listUsers(ctx) {
  const query = User
  ctx.body = await query.getUsers()
  ctx.status = 200
}
