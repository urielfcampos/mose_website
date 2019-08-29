const News = require('../../db/queries/news')

module.exports = async function createNews(ctx) {
  const news = ctx.request.body
  ctx.status = 201
  ctx.body = await News.addNews(news)
}
