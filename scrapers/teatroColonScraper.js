const logger = require('../utils/logger')('PAGE SCRAPER');
const getShowsInfo = require('../helpers/getShowsInfo');
const { EventsService } = require('../api/services');

const scraperObject = {
  url: 'https://teatrocolon.org.ar/es/temporada',
  async scraper(browser) {
    const showsFragments = [];
    const page = await browser.newPage();
    logger.log(`Navigating to ${this.url}...`);
    await page.goto(this.url, { timeout: 0 });
    logger.log('Page loaded, finding selector...');
    await page.waitForSelector('.view-content');
    await page.waitForTimeout(3000);
    logger.log('Selector found, getting all play pages...');
    const pages = await page.evaluate(() => {
      const pages = document.querySelectorAll('.pager__item');
      return [...pages].slice(0, -2).map((e) => e.childNodes[1].href)
    });
    for(const paginationPage of pages) {
      logger.log(`Start scraping ${paginationPage}`);
      const showsFragment = await getShowsInfo(paginationPage, browser);
      for (const show of showsFragment) {
        await EventsService.createEvent({
          title: show.title,
          location: show.theater,
          synopsis: show.description,
          dates: [show.dates],
          prices: show.prices,
          category: show.category,
          pageUrl: show.pageURL,
        });
      }
      showsFragments.push(showsFragment);
    }

    const shows = showsFragments.flat();
    logger.log('Extracted all shows', shows);
  }
};

module.exports = scraperObject;
