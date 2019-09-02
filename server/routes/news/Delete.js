const News = require('../../db/queries/news')

module.exports = async function deleteNews(ctx) {
  const { id } = ctx.params
  ctx.body = await News.deleteNews(id)
}
