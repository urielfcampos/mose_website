const bcrypt = require('bcryptjs')
const knex = require('../connection')

function addUser(user) {
  const salt = bcrypt.genSaltSync()
  const hash = bcrypt.hashSync(user.password, salt)
  return knex('users')
    .insert({
      email: user.email,
      password: hash,
      role: user.role,
      fullName: user.fullName
    })
    .returning('*')
}
function getUsers() {
  return knex('users')
    .select('fullName', 'username')
    .then((result) => {
      return result
    })
}
function getUsersById(id) {
  return knex('users')
    .select('fullName', 'email')
    .where('id', id)
    .then((result) => {
      return result
    })
}
function getUsersByEmail(email) {
  // eslint-disable-next-line no-console
  console.log(email)
  if (email === undefined) {
    throw new Error(`username is undefined`)
  }
  return knex('users')
    .where('email', email)
    .then((result) => {
      return result
    })
}

module.exports = {
  addUser,
  getUsers,
  getUsersById,
  getUsersByEmail
}
