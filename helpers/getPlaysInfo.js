const getLogger = require('../utils/logger');

const getPlaysInfo = async (urls, browser, instanceId = 0) => {
  const plays = [];
  const logger = getLogger(`GETPLAY - ${instanceId}`);
  logger.log(`Start scraping ${urls.length} URLS`);
  for (let url of urls) {
    play = await getPlayInfo(url, browser, logger);
    plays.push(play);
  }
  return plays;
};

const getPlayInfo = async (url, browser, logger) => {
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(0);
  const pageURL = `https://www.plateanet.com${url}`;
  logger.log('Extracting info from:', pageURL);
  await page.goto(pageURL);
  await page.waitForSelector('#img2sala', { timeout: 0 });
  await page.waitForTimeout(3000);
  logger.log('Page done loading');

  const title = await page.evaluate(() => {
    const titleElement = document.querySelector('[class*="titulo"]');
    return titleElement ? titleElement.innerText : '';
  });

  const theater = await page.evaluate(() => {
    const theaterElement = document.querySelector('[class*="subtitulo"]');
    return theaterElement ? theaterElement.innerText : '';
  });

  const synopsis = await page.evaluate(() => {
    const synopsisTitleElements = document.querySelectorAll('b');
    const synopsisTitle = [...synopsisTitleElements].find((element) => {
      return element.innerText === 'Sinopsis';
    });
    if (
      synopsisTitle &&
      synopsisTitle.parentElement.parentNode.getElementsByTagName('span')
        .length > 1
    ) {
      synopsisTitle.parentElement.parentNode
        .getElementsByTagName('span')[1]
        .childNodes[1].click();
    }
    return synopsisTitle
      ? synopsisTitle.parentElement.parentNode.getElementsByTagName('span')[0]
          .innerHTML
      : '';
  });

  const imageURL = await page.evaluate(() => {
    const imageElement = document.querySelector('img[class*="imgobradesktop"]');
    return imageElement ? imageElement.src : '';
  });

  const prices = await page.evaluate(() => {
    const playItemsElements = document.querySelectorAll(
      'p[class*="items-obra-p"]',
    );
    const pricesTitle = [...playItemsElements].find(
      (element) => element.innerText === 'Precios',
    );
    let siblingElements = pricesTitle.parentNode.getElementsByTagName('p');
    return siblingElements[1].innerText;
  });

  const category = await page.evaluate(() => {
    const playItemsElements = document.querySelectorAll(
      'p[class*="items-obra-p"]',
    );
    const categoryTitle = [...playItemsElements].find(
      (element) => element.innerText === 'Categoría',
    );
    let siblingElements = categoryTitle.parentNode.getElementsByTagName('p');
    return siblingElements[1].innerText;
  });

  const dates = await page.evaluate(() => {
    const playItemsElements = document.querySelectorAll(
      'p[class*="items-obra-p"]',
    );
    const datesTitle = [...playItemsElements].find(
      (element) =>
        element.innerText === 'Días de función' ||
        element.innerText === 'Día de función',
    );
    let siblingElements = datesTitle.parentNode.getElementsByTagName('p');
    if ([...siblingElements].length === 1) {
      siblingElements = datesTitle.parentNode.getElementsByTagName('div');
      const hoverLink = siblingElements[2];
      event = new MouseEvent('mouseenter');
      hoverLink.dispatchEvent(event);
      const datesString = document.querySelector(
        'div[class*="dias__funcion__detalle"]',
      ).innerText;
      return datesString.split('\n');
    } else {
      return siblingElements[1].innerText.split('\n');
    }
  });

  logger.log('Extracted info');
  logger.log({
    title,
    theater,
    synopsis,
    imageURL,
    dates,
    prices,
    category,
    pageURL,
  });

  await page.close();

  return {
    title,
    theater,
    synopsis,
    imageURL,
    dates,
    prices,
    category,
    pageURL,
  };
};

module.exports = getPlaysInfo;
