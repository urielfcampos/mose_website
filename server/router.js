const Router = require('koa-router')
const KoaBody = require('koa-body')
const KoaJwt = require('koa-jwt')

const errors = require('../shared/errors')
const auth = require('./routes/auth')
const users = require('./routes/users')
const config = require('./config')
const router = new Router()

const api = new Router({ prefix: '/api' })

api.use(KoaJwt({ getToken, secret: config.JWT_SECRET, passthrough: true }))

// Middlewares

const bodyJson = KoaBody()
// const bodyMultipart = KoaBody({ multipart: true })

// Authorization routes

api.get('/auth', isLoggedIn, auth.Show)
api.post('/auth', bodyJson, auth.Login)

api.get('/users/:id', users.Show)
// Not Found Routes
api.all('/*', (ctx) => {
  ctx.status = 404
  ctx.body = { code: errors.NOT_FOUND }
})

// Connect API routes to main router
router.use(api.routes())
router.use(api.allowedMethods())

module.exports = router

function getToken(ctx) {
  return ctx.request.query.token
}

function isLoggedIn(ctx, next) {
  const hasUser = ctx.state.hasUser
  const hasToken = ctx.request.get('Authorization')

  if (hasToken && !hasUser) {
    ctx.status = 400
    ctx.body = {
      code: errors.INVALID_TOKEN
    }
    return 0
  }
  if (!hasUser) {
    ctx.status = 401
    ctx.body = {
      code: errors.UNAUTHORIZED
    }
    return 0
  }
  return next()
}
