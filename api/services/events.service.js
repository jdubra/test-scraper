const { EventsDataAccess } = require('../../sequelize/data-access');

const getEvents = ({ limit, offset }) => {
  console.log(limit, offset);
  return EventsDataAccess.getEvents({ limit, offset });
};

const getEvent = ({ id }) => {
  return EventsDataAccess.getEvent({ id });
};

module.exports = {
  getEvents,
  getEvent,
};
