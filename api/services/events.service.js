const { EventsDataAccess } = require('../../sequelize/data-access');

const getEvents = ({
  title,
  category,
  location,
  // priceBottomLimit,
  // priceTopLimit,
  limit,
  offset
}) => {
  return EventsDataAccess.getEvents({
    title,
    category,
    location,
    // priceBottomLimit: priceBottomLimit ? parseInt(priceBottomLimit) : 10,
    // priceTopLimit: priceTopLimit ? parseInt(priceTopLimit) : 10,
    limit: limit ? parseInt(limit) : 10,
    offset: (offset || offset == 0) ? parseInt(offset) : 0,
  });
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
