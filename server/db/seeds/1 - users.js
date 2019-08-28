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
          email: 'admin',
          password: hash,
          fullName: 'Uriel',
          role: 'admin',
          state: 'para',
          fieldOfWork: 'gastronomia',
          phoneNumber: '3291-9599'
        }
      ])
    })
}
