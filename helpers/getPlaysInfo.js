const getLogger = require('../utils/logger');

const getPlaysInfo = async (urls, browser, instanceId = 0) => {
  const plays = [];
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(0);
  const logger = getLogger(`GETPLAY - ${instanceId}`);
  logger.log(`Start scraping ${urls.length} URLS`);
  for (let url of urls) {
    play = await getPlayInfo(url, logger, page);
    plays.push(play);
  }
  await page.close();
  return plays;
};

const getPlayInfo = async (url, logger, page) => {
  const pageURL = `https://www.plateanet.com${url}`;
  logger.log('Extracting info from:', pageURL);
  await page.goto(pageURL);
  await page.waitForSelector('#img2sala', { timeout: 0 });
  await page.waitForTimeout(3000);
  logger.log('Page done loading');

  await page.waitForSelector('[class*="titulo"]', { timeout: 0 });
  const title = await page.evaluate(() => {
    const titleElement = document.querySelector('[class*="titulo"]');
    return titleElement ? titleElement.innerText : '';
  });

  await page.waitForSelector('[class*="subtitulo"]', { timeout: 0 });
  const theater = await page.evaluate(() => {
    const theaterElement = document.querySelector('[class*="subtitulo"]');
    return theaterElement ? theaterElement.innerText : '';
  });
  
  await page.waitForSelector('b', { timeout: 0 });
  const description = await page.evaluate(() => {
    const descriptionTitleElements = document.querySelectorAll('b');
    const descriptionTitle = [...descriptionTitleElements].find((element) => {
      return element.innerText === 'Sinopsis';
    });
    if(descriptionTitle) {
      if (
        descriptionTitle &&
        descriptionTitle.parentElement.parentNode.getElementsByTagName('span')
          .length > 1
      ) {
        descriptionTitle.parentElement.parentNode
          .getElementsByTagName('span')[1]
          .childNodes[1].click();
      }
      return descriptionTitle
        ? descriptionTitle.parentElement.parentNode.getElementsByTagName('span')[0]
            .innerHTML
        : '';
    }
    return 'No disponible';
  });

  await page.waitForSelector('img[class*="imgobradesktop"]', { timeout: 0 });
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
    if (pricesTitle) {
      let siblingElements = pricesTitle.parentNode.getElementsByTagName('p');
      return siblingElements[1].innerText;
    }
    return 'No disponible';
  });

  await page.waitForSelector('p[class*="items-obra-p"]', { timeout: 0 });
  const category = await page.evaluate(() => {
    const playItemsElements = document.querySelectorAll(
      'p[class*="items-obra-p"]',
    );
    const categoryTitle = [...playItemsElements].find(
      (element) => element.innerText === 'Categoría',
    );
    if (categoryTitle) {
      let siblingElements = categoryTitle.parentNode.getElementsByTagName('p');
      return siblingElements[1].innerText;
    } else {
      return 'No disponible';
    }
  });

  await page.waitForSelector('p[class*="items-obra-p"]', { timeout: 0 });
  const dates = await page.evaluate(() => {
    const playItemsElements = document.querySelectorAll(
      'p[class*="items-obra-p"]',
    );
    const datesTitle = [...playItemsElements].find(
      (element) =>
        element.innerText === 'Días de función' ||
        element.innerText === 'Día de función',
    );
    if(datesTitle) {
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
    } else {
      return []
    }
  });

  logger.log('Extracted info');
  logger.log({
    title,
    theater,
    description,
    imageURL,
    dates,
    prices,
    category,
    pageURL,
  });

  return {
    title,
    theater,
    description,
    imageURL,
    dates,
    prices,
    category,
    pageURL,
  };
};

module.exports = getPlaysInfo;
