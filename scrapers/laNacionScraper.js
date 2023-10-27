const logger = require('../utils/logger')('PAGE SCRAPER');

const getPlaysInfo = require('../helpers/getPlaysInfo');
const getBatches = require('./batches');

const scraperObject = {
  url: 'https://www.lanacion.com.ar/cartelera-de-teatro/proximos-estrenos',
  async scraper(browser) {
    const page = await browser.newPage();
    logger.log(`Navigating to ${this.url}...`);
    await page.goto(this.url, { timeout: 0 });
    logger.log('Page loaded, finding selector...');
    await page.waitForSelector('.listaPrincipalTeatro__item');
    const pagePlaysUrls = await page.evaluate(() => {
      const playElements = document.querySelectorAll('.listaPrincipalTeatro__item');
      return [...playElements].map((element) => element.childNodes[1].href);
    })
    const batches = getBatches(pagePlaysUrls);
    const workers = batches.map((batch, index) =>
      getPlaysInfo(batch, browser, index),
    );
    await Promise.all(workers);
    logger.log(`Scraping finished`);
  },
};

module.exports = scraperObject;
