const User = require('../../db/queries/users')
const errors = require('../../../shared/errors')

module.exports = async function createUser(ctx) {
  const {
    email,
    fullName,
    password,
    role,
    state,
    phoneNumber,
    fieldOfWork
  } = ctx.request.body
  const user = {
    email,
    fullName,
    password,
    role,
    state,
    phoneNumber,
    fieldOfWork
  }
  const status = await validateRequest(user)
  switch (status) {
    case 400: {
      ctx.status = 400
      ctx.body = errors.MISSING_PARAM
      return
    }
    case 422: {
      ctx.status = 422
      ctx.body = errors.UNPROCESSABLE_ENTITY
      return
    }
    case 201: {
      ctx.status = 201
      ctx.body = await User.addUser(user)
      break
    }
    default: {
      ctx.status = 400
      ctx.body = errors.UNPROCESSABLE_ENTITY
    }
  }
}

async function validateRequest(req) {
  for (const param in req) {
    if (req[param] === undefined) {
      return 400
    }
  }
  const duplicateEmail = !!(await User.getUsersByEmail(req.email).length)

  if (duplicateEmail) {
    return 422
  }
  return 201
}
