const User = require('../../db/queries/users')
const errors = require('../../../shared/errors')

module.exports = async function createUser(ctx) {
  const { email, fullName, password, role } = ctx.request.body
  const user = { email, fullName, password, role }
  const validRequest = [email, fullName, password, role].every(
    (item) => item !== undefined
  )
  if (!validRequest) {
    ctx.status = 400
    ctx.body = { code: errors.INVALID_REQUEST }
    return
  }

  const duplicateEmail = !!(await User.getUsersByEmail(email).length)

  if (duplicateEmail) {
    ctx.status = 422
    ctx.body = { code: errors.UNPROCESSABLE_ENTITY }
    return
  }

  ctx.status = 201
  ctx.body = await User.addUser(user)
}
