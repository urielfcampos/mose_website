const Router = require('koa-router')
const passport = require('koa-passport')
const query = require('../db/queries/users')
const router = new Router({ prefix: '/api' })

router.get('/auth/users', async (ctx) => {
  ctx.type = 'json'
  ctx.body = await query.getUsers()
})

router.get('/auth/users/:id', async (ctx) => {
  const user = await query.getUsersById(ctx.params.id)
  if (user.length !== 0) {
    ctx.type = 'json'
    ctx.body = user
    ctx.status = 200
  } else {
    ctx.status = 404
    ctx.body = { code: 'Not found' }
  }
})

router.post('/auth/register', async (ctx) => {
  const user = await query.addUser(ctx.request.body)
  return passport.authenticate('local', (err, user, info, status) => {
    if (user) {
      ctx.login(user)
    } else {
      ctx.status = 400
      ctx.body = { status: 'error' }
      throw err
    }
  })(ctx)
})

router.post('/auth/login', (ctx) => {
  return passport.authenticate('local', (err, user, info, status) => {
    if (user) {
      ctx.login(user)
    } else {
      ctx.status = 400
      ctx.body = { status: 'error' }
      throw err
    }
  })(ctx)
})

module.exports = router
