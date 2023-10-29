const getLogger = require('../utils/logger');
const parseDates = require('./parseDates');
const { EventsService } = require('../api/services');

const getPlaysInfo = async (urls, browser, instanceId = 0) => {
  const logger = getLogger(`GETPLAY - ${instanceId}`);
  const plays = [];
  logger.log('Start scraping...');
  const newPage = await browser.newPage();
  for (const playURL of urls) {
    const play = await getPlayInfo(playURL, newPage);
    await EventsService.createEvent({
      title: play.title,
      location: play.theater,
      synopsis: play.description,
      dates: play.dates,
      prices: play.prices,
      category: play.category,
      pageUrl: play.pageURL,
    });
    logger.log('Play info extracted');
    logger.log(play);
    plays.push(play);
  }
  await newPage.close();
  return plays;
};

const getPlayInfo = async (url, page) => {
  await page.goto(url);
  await page.waitForSelector('.header__titulo', { timeout: 0 });
  const title = await page.evaluate(() => {
    const playInfoContainer = document.querySelector('.header__titulo');
    const titleElement = playInfoContainer.getElementsByTagName('h1')[0];
    return titleElement ? titleElement.innerText : 'No disponible';
  });
  await page.waitForSelector('.ficha__descrip__items', { timeout: 0 });
  const unparsedDates = await page.evaluate(() => {
    const datesContainer = document.querySelector('.ficha__descrip__items');
    if (datesContainer) {
      const datesElements = datesContainer.getElementsByTagName('dd')[0];
      return datesElements ? datesElements.innerText.split('\n') : [];
    }
    return [];
  });
  const dates = parseDates(unparsedDates, 'nacion');
  const theater = await page.evaluate(() => {
    const theaterContainer = document.querySelector('.contacto__sala__detalle');
    if (theaterContainer) {
      const theaterElement = theaterContainer.getElementsByTagName('h4')[0];
      return theaterElement ? theaterElement.innerText : 'No disponible';
    }
    return 'No disponible';
  });
  const description = await page.evaluate(() => {
    const descriptionContainer = document.querySelector(
      '.ficha__descrip__sinopsis',
    );
    if (descriptionContainer) {
      const descriptionElement =
        descriptionContainer.getElementsByTagName('dd')[0];
      return descriptionElement
        ? descriptionElement.innerText
        : 'No disponible';
    }
    return 'No disponible';
  });
  const imageURL = await page.evaluate(() => {
    const imageContainer = document.querySelector('.ficha');
    if (imageContainer) {
      const imageElement = imageContainer.getElementsByTagName('img')[0];
      return imageElement ? imageElement.src : 'No disponible';
    }
    return 'No disponible';
  });
  const { pricesString, newUrl } = await page.evaluate(() => {
    const pricesContainer = document.querySelector('.funcionesObra');
    if (pricesContainer) {
      const pricesAndButton = pricesContainer.getElementsByTagName('dd')[0];
      const pricesString = pricesAndButton
        ? pricesAndButton.innerText
        : 'No disponible';
      const newUrl = pricesAndButton
        ? pricesAndButton.getElementsByTagName('a')[0].href
        : 'No disponible';
      return { pricesString, newUrl };
    }
    return { pricesString: 'No disponible', newUrl: 'No disponible' };
  });
  const regexPattern = /\$\d+/;
  const prices = pricesString.match(regexPattern)
    ? pricesString.match(regexPattern)[0]
    : 'No disponible';
  const pageURL = newUrl === 'No disponible' ? url : newUrl;
  const category = 'Teatro';
  return {
    title,
    dates,
    theater,
    description,
    imageURL,
    prices,
    category,
    pageURL,
  };
};

module.exports = getPlaysInfo;
