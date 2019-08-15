const bcrypt = require('bcryptjs')
exports.seed = function(knex) {
  const salt = bcrypt.genSaltSync()
  const hash = bcrypt.hashSync('admin', salt)
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          email: 'admin',
          password: hash,
          fullName: 'Uriel',
          role: 'admin'
        }
      ])
    })
}
