const bcrypt = require('bcryptjs')

const User = require('../../db/queries/users')
const errors = require('../../../shared/errors')
const utils = require('../../utils')

module.exports = async function login(ctx) {
  const { email, password } = ctx.request.body

  if (email === undefined || password === undefined) {
    ctx.status = 400
    ctx.body = { code: errors.MISSING_PARAM }
    return
  }

  const user = await User.getUsersByEmail(ctx.request.body.email)
  if (user.lenght === 0) {
    ctx.status = 400
    ctx.body = { code: errors.INVALID_CREDENTIALS }
    return
  }

  try {
    if (!comparePass(password, user[0].password)) {
      throw Error('Invalid credentials')
    }
  } catch (err) {
    ctx.status = 400
    ctx.body = { code: errors.INVALID_CREDENTIALS }
    return
  }

  const token = utils.signToken(user[0])
  ctx.body = { token, user }
}

function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword)
}
