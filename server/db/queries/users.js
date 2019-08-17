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
      fullName: user.fullName,
      state: user.state,
      phoneNumber: user.phoneNumber,
      fieldOfWork: user.fieldOfWork
    })
    .returning('*')
}
function getUsers() {
  return knex('users')
    .select(
      'email',
      'role',
      'fullName',
      'state',
      'phoneNumber',
      'fieldOfWork',
      'id'
    )
    .then((result) => {
      // eslint-disable-next-line no-console
      console.log(result)
      return result
    })
}
function getUsersById(id) {
  return knex('users')
    .select()
    .where('id', id)
    .then((result) => {
      return result
    })
}
function getUsersByEmail(email) {
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
