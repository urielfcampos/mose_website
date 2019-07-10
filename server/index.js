const Koa = require('koa')
const consola = require('consola')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session')
const passport = require('koa-passport')
const { Nuxt, Builder } = require('nuxt')

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
const auth = require('./routes/auth')

const app = new Koa()

// session control
// TODO: key should be in process.env
app.keys = ['placeholder']
app.use(session(app))

// body parser
app.use(bodyParser())

// Auth
require('./auth')
app.use(passport.initialize())
app.use(passport.session())
app.use(auth.routes())
config.dev = !(app.env === 'production')

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
  app.on('error', (err, ctx) => {
    // eslint-disable-next-line no-console
    console.error('server error', err, ctx)
  })
}

start()
