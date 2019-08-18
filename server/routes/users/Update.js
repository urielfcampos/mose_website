const User = require('../../db/queries/users')
const errors = require('../../../shared/errors')

module.exports = async function updateUser(ctx) {
  const { id } = ctx.params
  {
    // eslint-disable-next-line no-console
    console.log(ctx.state)
    const { user } = ctx.state.user
    if (user === null || (user.role !== 'admin' && Number(id) !== user.id)) {
      ctx.status = 403
      ctx.body = { code: errors.FORBIDDEN }
      return
    }
  }
  const payload = ctx.request.body

  const user = await User.getUsersById(id)
  if (user === null) {
    ctx.status = 404
    ctx.body = { code: errors.NOT_FOUND }
    return
  }

  ctx.body = await User.updateUser(payload)
}
