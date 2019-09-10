const knex = require('../connection')

function addEvent(event, userId) {
  const time = new Date(event.time)
  return knex('events')
    .insert({
      name: event.name,
      summary: event.summary,
      local: event.local,
      time: knex.raw('to_timestamp(?)', time.getTime() / 1000),
      author: userId,
      date: event.date
    })
    .then((result) => {
      return result
    })
}

function getEvents() {
  return knex('events')
    .join('users', 'users.id', 'events.author')
    .select(
      'events.name',
      'events.summary',
      'events.local',
      'events.time',
      'users.fullName',
      'events.date'
    )
    .then((result) => {
      return result
    })
}

function getEventsById(id) {
  return knex('events')
    .select()
    .where('id', id)
    .then((result) => {
      return result
    })
}

function getEventsbyUserId(userid) {
  return knex('events')
    .select()
    .where('author', userid)
    .then((result) => {
      return result
    })
}

function deleteEventById(id) {
  return knex('events')
    .del()
    .where('id', id)
    .then((result) => {
      return result
    })
}

function updateEvent(event) {
  if (event === undefined) {
    throw new Error('event is undefined')
  }
  return knex('events')
    .where('id', event.id)
    .update({
      name: event.name,
      summary: event.summary,
      local: event.local,
      time: event.time
    })
    .then((result) => {
      return result
    })
}

module.exports = {
  addEvent,
  getEvents,
  getEventsById,
  getEventsbyUserId,
  deleteEventById,
  updateEvent
}
