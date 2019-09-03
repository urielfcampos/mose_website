const Events = require('../../db/queries/events')

module.exports = async function createEvent(ctx) {
  const { name, summary, time, local } = ctx.request.body
  const event = { name, summary, time, local }
  const { user } = ctx.state.user
  ctx.status = 201
  ctx.body = await Events.addEvent(event, user.id)
}
