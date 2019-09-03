const Events = require('../../db/queries/events')
const errors = require('../../../shared/errors')

module.exports = async function updateEvent(ctx) {
  const { id } = ctx.params

  const { name, summary, time, local } = ctx.request.body

  const payload = { name, summary, time, local, id }

  const event = await Events.getEventsById(id)
  if (event === null) {
    ctx.status = 404
    ctx.body = { code: errors.NOT_FOUND }
  }
  ctx.body = await event.updateEvent(payload)
}
