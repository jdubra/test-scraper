const { EventsDataAccess } = require('../../sequelize/data-access');

const getEvents = ({
  title,
  category,
  location,
  from,
  to,
  limit,
  offset,
  sort_by: sortBy,
  sort_direction: sortDirection,
}) => {
  return EventsDataAccess.getEvents({
    title,
    category,
    location,
    from,
    to,
    limit: limit ? parseInt(limit) : 10,
    offset: offset || offset == 0 ? parseInt(offset) : 0,
    sortBy,
    sortDirection,
  });
};

const getEvent = ({ id }) => {
  return EventsDataAccess.getEvent({ id });
};

const createEvent = async (event) => {
  const existingEvent = await EventsDataAccess.getEvent({
    pageUrl: event.pageUrl,
  });
  if (!existingEvent) {
    return EventsDataAccess.createEvent(event);
  }
};

module.exports = {
  getEvents,
  getEvent,
  createEvent,
};
