const { CronJob } = require('cron');
const { EventsService } = require('../services');
const getLogger = require('../../utils/logger');

const MID_NIGHT = '0 0 * * *';
const logger = getLogger('FETCH EVENTS CRON');

const browserObject = require('../../browser');
const scraperController = require('../../controllers/pageController');

const fetchEventsCron =  new CronJob(MID_NIGHT, async () => {
  try {
    logger.log(`Scrapping events...`);
    // Start the browser and create a browser instance
    const browserInstance = browserObject.startBrowser();
    // Pass the browser instance to the scraper controller
    scraperController(browserInstance);
  } catch (error) {
    logger.log('Error scrapping events:', error);
  }
});

module.exports = {
  fetchEventsCron,
};