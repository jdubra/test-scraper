const getLogger = require('../utils/logger');

const getShowsInfo = async (url, browser, instanceId = 0) => {
  const logger = getLogger(`GETSHOW - ${instanceId}`);
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(0);
  await page.goto(url, { timeout: 0 });
  logger.log('Page loaded, finding selector...');
  await page.waitForSelector('.view-content');
  await page.waitForTimeout(3000);
  logger.log(`Start scraping ${url}`);
  const shows = await page.evaluate(() => {
    const showDivs = document.querySelectorAll('.listadoobras.row');
    const shows = [];
    for(const showDiv of [...showDivs]) {
      const title = showDiv.getElementsByClassName("title")[0].innerText
      const category = showDiv.getElementsByClassName("category")[0].innerText
      const dates = showDiv.getElementsByClassName("dates")[0].innerText
      const description = showDiv.getElementsByClassName("description")[0].innerText
      const image = showDiv.getElementsByTagName('img')[0].src
      const theater = 'Teatro Colón'
      console.log(showDiv.getElementsByClassName("btn-buytickets"))
      const buyButton = showDiv.getElementsByClassName("btn-buytickets")
      const pageURL = buyButton.length > 0 ? buyButton[0].href : 'No disponible'
      const prices = 'No disponible'
      shows.push({
        title: title,
        category: category,
        dates: dates,
        description: description,
        image: image,
        theater: theater,
        pageURL: pageURL,
        prices: prices,
      })
    }
    return shows;
  });
  logger.log('Extracted all shows from page', shows);
  await page.close();

  return shows;
}

module.exports = getShowsInfo;
