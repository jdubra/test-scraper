const { Op } = require('sequelize');
const { EventModel } = require('../models');
const getLogger = require('../../utils/logger');

const logger = getLogger('EVENTS DA');

const createEvent = async (event) => {
  logger.log({ event });
  return EventModel.create(event);
};

const getEvents = async ({ limit, offset, title, category, location }) => {
  return EventModel.findAll({
    select: [
      'title',
      'category',
      'location',
      'pageUrl',
      'prices',
      'dates',
      'synopsis',
    ],
    where: {
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
      // ...(priceBottomLimit && priceTopLimit && {
      //   prices: {
      //     [Op.between]: [priceBottomLimit, priceTopLimit],
      //   },
      // }),
      // ...(priceBottomLimit && {
      //   prices: {
      //     [Op.gte]: priceBottomLimit,
      //   },
      // }),
      // ...(priceTopLimit && {
      //   prices: {
      //     [Op.lte]: priceTopLimit,
      //   },
      // }),
    },
    limit,
    offset,
  });
};

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
