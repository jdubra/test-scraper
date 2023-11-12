const { EventsDataAccess } = require('../../sequelize/data-access');
const getLogger = require('../../utils/logger');

const logger = getLogger('EVENTS SERVICE');

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
    title: event.title,
    location: event.location,
    synopsis: event.synopsis,
  });

  if (!existingEvent) {
    logger.log(`Creating ${event.title} Event`);
    return EventsDataAccess.createEvent(event);
  } else {
    logger.log(`Skipping ${event.title} Event`);
  }
};

module.exports = {
  getEvents,
  getEvent,
  createEvent,
};
