const { EventModel } = require('../models');

const createEvent = async (event) => {
  return EventModel.create(event);
}

const getEvents = async ({ limit, offset }) => {
  return EventModel.findAll({
    limit,
    offset,
  });
}

const getAllEvents = async () => {
  return EventModel.findAll();
}

const getEventById = async (id) => {
  return EventModel.findByPk(id);
}

const updateEvent = async (id, event) => {
  return EventModel.update(event, {
    where: {
      id,
    },
  });
}

const deleteEvent = async (id) => {
  return EventModel.destroy({
    where: {
      id,
    },
  });
}

module.exports = {
  createEvent,
  getEvents,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};