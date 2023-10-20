const logger = require('../utils/logger')('PAGE CONTROLLER');

const plateanetScraper = require('../scrapers/plateanetScraper');
const teatroColonScraper = require('../scrapers/teatroColonScraper');

async function scrapeAll(browserInstance) {
  let browser;
  try {
    browser = await browserInstance;
    await teatroColonScraper.scraper(browser);
    await plateanetScraper.scraper(browser);
  } catch (err) {
    logger.log('Could not resolve the browser instance => ', err);
  }
}

module.exports = (browserInstance) => scrapeAll(browserInstance);
