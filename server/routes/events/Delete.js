const Events = require('../../db/queries/events')

module.exports = async function deleteEvents(ctx) {
  const { id } = ctx.params
  ctx.body = await Events.deleteEventById(id)
}
