const News = require('../../db/queries/news')
const errors = require('../../../shared/errors')

module.exports = async function updateNews(ctx) {
  const { id } = ctx.params

  const { title, bodyText, author, data } = ctx.request.body

  const payload = { title, bodyText, author, data, id }

  const news = await News.getNewsById(id)
  if (news === null) {
    ctx.status = 404
    ctx.body = { code: errors.NOT_FOUND }
  }
  ctx.body = await News.updateNews(payload)
}
