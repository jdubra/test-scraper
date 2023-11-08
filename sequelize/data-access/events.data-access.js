const { Op, literal } = require('sequelize');
const { EventModel } = require('../models');
const getLogger = require('../../utils/logger');

const logger = getLogger('EVENTS DA');

const createEvent = async (event) => {
  logger.log({ event });
  return EventModel.create(event);
};

const getEvents = async ({
  limit,
  offset,
  title,
  category,
  location,
  sortBy,
  sortDirection,
  from,
  to,
}) => {
  console.log(sortBy, sortDirection);
  const dateConditions = [];
  const conditions = {
    ...(title && {
      title: {
        [Op.iLike]: `%${title}%`,
      },
    }),
    ...(category && {
      category: {
        [Op.iLike]: `%${category}%`,
      },
    }),
    ...(location && {
      location: {
        [Op.iLike]: `%${location}%`,
      },
    }),
  }
  if (from) {
    dateConditions.push(literal(`EXISTS (
      SELECT 1
      FROM unnest(dates) AS date_col
      WHERE date_col >= '${from}'
    )`),);
  }
  if (to) {
    dateConditions.push(literal(`EXISTS (
      SELECT 1
      FROM unnest(dates) AS date_col
      WHERE date_col <= '${to}'
    )`),);
  }
  return EventModel.findAndCountAll({
    attributes: [
      'title',
      'category',
      'location',
      'pageUrl',
      'prices',
      'dates',
      'synopsis',
    ],
    ...(from || to ? {
      where: {
        [Op.and]: [...dateConditions, conditions],
      },
    } : {
      where: conditions,
    }),
    ...(sortBy && {
      order: [[sortBy, sortDirection || 'ASC']],
    }),
    limit,
    offset,
  });
}

const getEvent = async (where) => {
  return EventModel.findOne({
    where,
  });
};

module.exports = {
  createEvent,
  getEvents,
  getEvent,
};
