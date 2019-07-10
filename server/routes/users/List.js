const User = require('../../db/queries/users')

module.exports = function listUsers(ctx) {
  const { email } = ctx.request.query
  const query = User
  if (email !== undefined) {
    ctx.body = query.getUsersByEmail(email)
  }
}
