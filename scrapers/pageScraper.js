const selectFilters = async (page) => {
  await page.waitForSelector('[class*="obras__btn__filtro__alfa"]');
  const filters = await page.$$('.obras__btn__filtro__alfa');
  await filters[filters.length - 1].click();
}

const scraperObject = {
  url: 'https://www.plateanet.com/lista-obras',
  async scraper(browser) {
    // Open browser
    let page = await browser.newPage();
    // Navigate to site
    console.log(`Navigating to ${this.url}...`);
    await page.goto(this.url, { timeout: 0 });
    console.log('Page loaded, finding selector...');
    // Wait for page to load
    await page.waitForSelector('[class*="obras__resultados__img"]');
    console.log('Selector found, selecting filters...');
    
    // Select the proper filter
    await selectFilters(page);
    
    // Get all plays
    console.log('Get all plays...')
    const allImages = await page.$$('img');
    const playImages = [...allImages].slice(2);
    // Filter all images whose className is empty
    let filteredImages = []
    for (const image of playImages) {
      const imageClassName = await page.evaluate(el => el.className, image);
      if (imageClassName !== '') {
        filteredImages.push(imageClassName);
      }
    }
    filteredImages = filteredImages.slice(0, -5)
    let plays = [];
    
    console.log('Get all plays information...');
    for (const imageClass of filteredImages) {
      console.log('Start new iteration...')
      console.log(`Clicking on ${imageClass}...`);
      await page.waitForSelector(`.${imageClass}`);
      console.log('Selector found, getting image...');
      const image = await page.$(`.${imageClass}`);
      console.log(image)
      console.log('Image found, clicking on it...');
      await image.click();
      console.log('Image clicked, waiting for title...');      
      await page.waitForSelector('h1[class*="titulo"]');
      // Find play's title
      const title = await page.evaluate(() => {
        const titleElement = document.querySelector('[class*="titulo"]');
        console.log('titleElement is:');
        console.log(titleElement);
        return titleElement ? titleElement.innerText : '';
      });
      // Find play's theater
      const theater = await page.evaluate(() => {
        const theaterElement = document.querySelector('[class*="subtitulo"]');
        console.log('theaterElement is:');
        console.log(theaterElement);
        return theaterElement ? theaterElement.innerText : '';
      });
      // Find b tag with synopsis title in content
      const synopsis = await page.evaluate(() => {
        // wait 1 second for synopsis to load
        setTimeout(() => {}, 1000);
        const synopsisTitleElements = document.querySelectorAll('b');
        const synopsisTitle = [...synopsisTitleElements].find((element) => {
          console.log('element inner text is:');
          console.log(element.innerText);
          return element.innerText === 'Sinopsis';
        });
        if (synopsisTitle && synopsisTitle.parentElement.parentNode.getElementsByTagName('span').length > 1){
          console.log('CLICK')
          console.log(synopsisTitle.parentElement.parentNode.getElementsByTagName('span')[1].childNodes[1].innerHTML)
          synopsisTitle.parentElement.parentNode.getElementsByTagName('span')[1].childNodes[1].click()
        }
        return synopsisTitle ? synopsisTitle.parentElement.parentNode.getElementsByTagName('span')[0].innerHTML : ''
      });
      plays.push({ title, theater, synopsis });
      
      // Go back to plays page and select proper filter
      await page.goto(this.url, { timeout: 0 });
      await selectFilters(page);
    }

    console.log('plays is:');
    console.log(plays);
  }
};

module.exports = scraperObject;
