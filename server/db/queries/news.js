const knex = require('../connection')

function addNews(news) {
  return knex('news')
    .insert({
      ...news
    })
    .then((result) => {
      return result
    })
}

module.exports = { addNews }
