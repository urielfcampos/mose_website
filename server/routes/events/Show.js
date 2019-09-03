const Events = require('../../db/queries/events')

module.exports = async function showUsersById(ctx) {
  const { id } = ctx.params
  ctx.body = await Events.getEventsById(id)
}
