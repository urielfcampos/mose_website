const jwt = require('jsonwebtoken')
const config = require('./config')

exports.signToken = function signToken(
  user,
  // 24 hours default exp
  exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24
) {
  return jwt.sign(
    {
      user,
      exp
    },
    config.JWT_SECRET
  )
}
