const puppeteer = require('puppeteer');
const logger = require('./utils/logger')('BROWSER');

async function startBrowser() {
  let browser;
  try {
    logger.log('Opening the browser......');
    browser = await puppeteer.launch({
      headless: true,
      args: ['--disable-setuid-sandbox'],
      ignoreHTTPSErrors: true,
      timeout: 0,
    });

    logger.log('Loaded!');
  } catch (err) {
    logger.log('Could not create a browser instance => : ', err);
  }
  return browser;
}

module.exports = {
  startBrowser,
};
