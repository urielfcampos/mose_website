const jwt = require('jsonwebtoken')
const config = require('./config')
exports.paginateContext = function paginateContext(ctx, collectionBase) {
  const { pagination } = collectionBase
  ctx.set('Pagination-Page', pagination.page)
  ctx.set('Pagination-Page-Size', pagination.pageSize)
  ctx.set('Pagination-Row-Count', pagination.rowCount)
  ctx.set('Pagination-Page-Count', pagination.pageCount)
  ctx.body = collectionBase.toJSON()
}
exports.signToken = function signToken(
  user,
  // 24 hours default exp
  exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24
) {
  return jwt.sign(
    {
      user,
      exp
    },
    config.JWT_SECRET
  )
}
