const News = require('../../db/queries/news')

module.exports = async function listNews(ctx) {
  ctx.body = await News.getNews()
}
