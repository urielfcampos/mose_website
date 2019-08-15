process.env.NODE_ENV = 'test'

const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const server = require('../src/server/index')
const knex = require('../src/server/db/connection')

describe('routes : auth', () => {
  beforeEach(() => {
    return knex.migrate
      .rollback()
      .then(() => {
        return knex.migrate.latest()
      })
      .then(() => {
        return knex.seed.run()
      })
  })

  afterEach(() => {
    return knex.migrate.rollback()
  })
})

describe('POST /auth/login', () => {
  it('It should login', (done) => {
    chai
      .request(server)
      .post('/auth/login')
      .end((err, res) => {
        should.not.exist(err)
        res.redirects.length.should.eql(0)
        res.status.should.eql(200)
        res.type.should.eql('text/html')
        res.text.should.contain('<h1>Register</h1>')
        res.text.should.contain(
          '<p><button type="submit">Register</button></p>'
        )
        done()
      })
  })
})
