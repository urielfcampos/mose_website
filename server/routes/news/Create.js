const News = require('../../db/queries/news')

module.exports = async function createNews(ctx) {
  const news = ctx.request.body
  const { user } = ctx.state.user
  news.author = user.id
  ctx.status = 201
  ctx.body = await News.addNews(news)
}
