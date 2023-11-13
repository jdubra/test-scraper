const { CronJob } = require('cron');
const { EventsService } = require('../services');
const getLogger = require('../../utils/logger');

const MID_NIGHT = '0 0 * * *';
const EVERY_30_SECONDS = '*/30 * * * * *';
const logger = getLogger('DELETE EVENTS CRON');

const deleteEventsCron =  new CronJob(MID_NIGHT, async () => {
  try {
    const result = await EventsService.removeOldEvents();
    logger.log(`${result ? 'Success' : 'Error'} removing old events`);
  } catch (error) {
    logger.log(`Error removing old events`, error);
  }
});

module.exports = {
  deleteEventsCron,
};