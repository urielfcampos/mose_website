const Events = require('../../db/queries/events')

module.exports = async function listEvents(ctx) {
  ctx.body = await Events.getEvents()
  ctx.status = 200
}
