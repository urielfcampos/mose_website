const User = require('../../db/queries/users')
const errors = require('../../../shared/errors')

module.exports = async function deleteUser(ctx) {
  const { id } = ctx.params
  {
    const { user } = ctx.state.user
    if (user === null || (user.role !== 'admin' && Number(id) !== user.id)) {
      ctx.status = 403
      ctx.body = { code: errors.FORBIDDEN }
    }
  }
  const user = await User.getUsersById(id)
  if (user === null) {
    ctx.status = 404
    ctx.body = { code: errors.NOT_FOUND }
    return
  }
  if (user === ctx.state.user) {
    ctx.status = 422
    ctx.body = { code: errors.UNPROCESSABLE_ENTITY }
  }
  await User.deleteUserById(id)
  ctx.body = user
  ctx.status = 201
}
