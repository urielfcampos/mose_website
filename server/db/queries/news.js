const knex = require('../connection')

function addNews(news) {
  return knex('news')
    .insert({
      title: news.title,
      bodyText: news.bodyText,
      data: news.data,
      author: news.author
    })
    .then((result) => {
      return result
    })
}

function getNews() {
  return knex('news')
    .join('users', 'users.id', 'news.author')
    .select(
      'news.id',
      'news.title',
      'news.bodyText',
      'news.data',
      'users.fullName'
    )
    .then((result) => {
      return result
    })
}

function updateNews(news) {
  if (news === undefined) {
    throw new Error('news is undefined')
  }
  return knex('news')
    .where('id', news.id)
    .update(news)
    .then((result) => {
      return result
    })
}

function getNewsById(id) {
  return knex('news')
    .select()
    .where('id', id)
    .then((result) => {
      return result
    })
}

function deleteNews(id) {
  return knex('news')
    .del()
    .where('id', id)
    .then((result) => {
      return result
    })
}

module.exports = { addNews, getNews, updateNews, getNewsById, deleteNews }
