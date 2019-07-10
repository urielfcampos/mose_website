const path = require('path')
const dotenv = require('dotenv')

const env = process.env.NODE_ENV || 'development'

const silent = env !== 'production'

const envSetup = dotenv.config({
  path: path.join(__dirname, '../.env')
})

if (envSetup.error && !silent) {
  throw envSetup.error
}

const {
  HOST = '0.0.0.0',
  PORT = '3000',
  JWT_SECRET = 'my-secret',
  API_PAGE_SIZE = 10,
  DATABASE = 'sqlite',
  API_URL_BROWSER = '/api'
} = process.env

module.exports = {
  HOST,
  PORT,
  JWT_SECRET,
  API_PAGE_SIZE,
  DATABASE,
  API_URL_BROWSER
}
