const Examples = require('../../db/queries/examples')
const errors = require('../../../shared/errors')

module.exports = async function createExample(ctx) {
  const example = ctx.request.body
  const status = await validateRequest(example)
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
      ctx.body = await Examples.addExample(example)
      break
    }
    default: {
      ctx.status = 400
      ctx.body = errors.UNPROCESSABLE_ENTITY
    }
  }
}

function validateRequest(req) {
  for (const param in req) {
    if (req[param] === undefined) {
      return 400
    }
  }
  return 201
}
