const knex = require('../connection')

function addUser(user) {
  return knex('users')
    .insert({
      username: user.username,
      password: user.password
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
    .select('fullName', 'username')
    .where('id', id)
    .then((result) => {
      return result
    })
}

module.exports = {
  addUser,
  getUsers,
  getUsersById
}
