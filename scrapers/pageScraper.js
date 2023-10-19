const logger = require('../utils/logger')('PAGE SCRAPER');
const getBatches = require('./batches');

const selectFilters = async (page) => {
  await page.waitForSelector('[class*="obras__btn__filtro__alfa"]');
  const filters = await page.$$('.obras__btn__filtro__alfa');
  await filters[filters.length - 1].click();
};

const scraperObject = {
  url: 'https://www.plateanet.com/lista-obras',
  async scraper(browser) {
    // Open browser
    const page = await browser.newPage();
    // Navigate to site
    logger.log(`Navigating to ${this.url}...`);
    await page.goto(this.url, { timeout: 0 });
    logger.log('Page loaded, finding selector...');
    // Wait for page to load
    await page.waitForSelector('[class*="obras__resultados__img"]');
    await page.waitForTimeout(3000);
    logger.log('Selector found, selecting filters...');

    // Select the proper filter
    await selectFilters(page);

    // Get all plays
    logger.log('Get all play images...');
    const allImages = await page.$$('img');
    const playImages = [...allImages].slice(2);
    // Filter all images whose className is empty
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

    urls = urls.filter((a) => !!a);

    logger.log(`Done, got ${urls.length} valid URLs`);

    getBatches(urls);
  },
};

module.exports = scraperObject;
