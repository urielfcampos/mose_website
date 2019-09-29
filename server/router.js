const Router = require('koa-router')
const KoaBody = require('koa-body')
const KoaJwt = require('koa-jwt')

const errors = require('../shared/errors')
const auth = require('./routes/auth')
const users = require('./routes/users')
const examples = require('./routes/examples')
const news = require('./routes/news')
const events = require('./routes/events')
const config = require('./config')
const frontend = require('./routes/frontend')
const router = new Router()

const api = new Router({ prefix: '/api' })

api.use(KoaJwt({ getToken, secret: config.JWT_SECRET, passthrough: true }))

// Middlewares

const bodyJson = KoaBody()
// const bodyMultipart = KoaBody({ multipart: true })

// Authorization routes

api.get('/auth', isLoggedIn, auth.Show)
api.post('/auth', bodyJson, auth.Login)

// Users routes

api.get('/users', bodyJson, users.List)
api.get('/users/fields', users.ListFields)
api.get('/users/:id', bodyJson, users.Show)
api.post('/users', bodyJson, users.Create)
api.put('/users/:id', bodyJson, users.Update)
api.delete('/users/:id', bodyJson, users.Delete)

// Examples routes
api.get('/examples', bodyJson, examples.List)
api.get('/examples/fields', bodyJson, examples.ListFields)
api.get('/examples/:id', bodyJson, examples.Show)
api.post('/examples', bodyJson, examples.Create)
api.put('/examples/:id', bodyJson, examples.Update)
api.delete('/examples/:id', bodyJson, examples.Delete)

// News routes
api.get('/news', bodyJson, news.List)
api.post('/news', bodyJson, news.Create)
api.put('/news/:id', bodyJson, news.Update)
api.delete('/news/:id', bodyJson, news.Delete)

// Event routes
api.get('/events', bodyJson, events.List)
api.get('/events/:id', bodyJson, events.Show)
api.post('/events', bodyJson, events.Create)
api.put('/events/:id', bodyJson, events.Update)
api.del('/events/:id', bodyJson, events.Delete)

// Not Found Routes
api.all('/*', (ctx) => {
  ctx.status = 404
  ctx.body = { code: errors.NOT_FOUND }
})
// Connect API routes to main router
router.use(api.routes())
router.use(api.allowedMethods())
// Frontend Fallback Route
router.get('*', frontend.Render)

module.exports = router

function getToken(ctx) {
  return ctx.request.query.token
}

function isLoggedIn(ctx, next) {
  const hasUser = ctx.state.user
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
