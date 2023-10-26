const { EventsDataAccess } = require('../../sequelize/data-access');

const getEvents = ({ limit, offset }) => {
  return EventsDataAccess.getEvents({ limit, offset });
};

const getEvent = ({ id }) => {
  return EventsDataAccess.getEvent({ id });
};

const createEvent = async (event) => {
  const existingEvent = await EventsDataAccess.getEvent({ pageUrl: event.pageUrl });
  if (!existingEvent) {
    return EventsDataAccess.createEvent(event);
  }
}

module.exports = {
  getEvents,
  getEvent,
  createEvent,
};
