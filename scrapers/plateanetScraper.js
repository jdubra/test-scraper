const logger = require('../utils/logger')('PAGE SCRAPER');

const getPlaysInfo = require('../helpers/getPlaysInfo');
const getBatches = require('./batches');

const selectFilters = async (page) => {
  await page.waitForSelector('[class*="obras__btn__filtro__alfa"]');
  const filters = await page.$$('.obras__btn__filtro__alfa');
  await filters[filters.length - 1].click();
};

const scraperObject = {
  url: 'https://www.plateanet.com/lista-obras',
  async scraper(browser) {
    const page = await browser.newPage();
    logger.log(`Navigating to ${this.url}...`);
    await page.goto(this.url, { timeout: 0 });
    logger.log('Page loaded, finding selector...');
    await page.waitForSelector('[class*="obras__resultados__img"]');
    await page.waitForTimeout(3000);
    logger.log('Selector found, selecting filters...');
    await selectFilters(page);
    await page.waitForTimeout(3000);
    logger.log('Get all play images...');
    const allImages = await page.$$('img');
    const playImages = [...allImages].slice(2);
    let filteredImages = [];

    for (const image of playImages) {
      const imageClassName = await page.evaluate((el) => el.className, image);

      if (imageClassName !== '') {
        filteredImages.push(imageClassName);
      }
    }

    filteredImages = filteredImages.slice(0, -5);

    logger.log(`Done, got ${filteredImages.length} play images`);

    let urls = [];

    logger.log('Getting play URLs');

    for (const imageClass of filteredImages) {
      await page.waitForSelector(`.${imageClass}`);
      const image = await page.$(`.${imageClass}`);

      const url = await page.evaluate((imageElement) => {
        let browserUrl = '';

        // eslint-disable-next-line no-restricted-globals
        history.pushState = (_a, _b, c) => {
          browserUrl = c;
          throw new Error(c);
        };

        try {
          imageElement.click();
        } catch (error) {
          // EXPECTED ERROR TO BE THROWN
        }

        return browserUrl;
      }, image);

      urls.push(url);
    }

    urls = Array.from(new Set(urls.filter((a) => !!a)));

    logger.log(`Done, got ${urls.length} valid unique URLs`);

    const batches = getBatches(urls);

    logger.log(`Got ${batches.length} batches`);

    const workers = batches.map((batch, index) =>
      getPlaysInfo(batch, browser, index),
    );

    await Promise.all(workers);
  },
};

module.exports = scraperObject;
