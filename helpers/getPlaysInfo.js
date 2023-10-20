const getPlaysInfo = async ( urls, browser ) => {
  const plays = []
  for (let url of urls) {
    play = await getPlayInfo(url, browser)
    plays.push(play)
  }
  return plays
}

const getPlayInfo = async ( url, browser ) => {
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(0);
  const pageURL = `https://www.plateanet.com${url}`;
  console.log('Extracting info from:', pageURL);
  await page.goto(pageURL);
  await page.waitForSelector('#img2sala', { timeout: 0 });
  await page.waitForTimeout(3000);
  console.log('Page done loading')

  const title = await page.evaluate(() => {
    const titleElement = document.querySelector('[class*="titulo"]');
    console.log('titleElement is:');
    console.log(titleElement);
    return titleElement ? titleElement.innerText : '';
  });

  const theater = await page.evaluate(() => {
    const theaterElement = document.querySelector('[class*="subtitulo"]');
    console.log('theaterElement is:');
    console.log(theaterElement);
    return theaterElement ? theaterElement.innerText : '';
  });

  const synopsis = await page.evaluate(() => {
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

  const imageURL = await page.evaluate(() => {
    console.log('Getting image URL...')
    const imageElement = document.querySelector('img[class*="imgobradesktop"]');
    return imageElement ? imageElement.src : '';
  });

  const prices = await page.evaluate(() => {
    const playItemsElements = document.querySelectorAll('p[class*="items-obra-p"]');
    const pricesTitle = [...playItemsElements].find((element) => element.innerText === 'Precios');
    let siblingElements = pricesTitle.parentNode.getElementsByTagName('p');
    return siblingElements[1].innerText
  });

  const category = await page.evaluate(() => {
    const playItemsElements = document.querySelectorAll('p[class*="items-obra-p"]');
    const categoryTitle = [...playItemsElements].find((element) => element.innerText === 'Categoría');
    let siblingElements = categoryTitle.parentNode.getElementsByTagName('p');
    return siblingElements[1].innerText
  });

  const dates = await page.evaluate(() => {
    const playItemsElements = document.querySelectorAll('p[class*="items-obra-p"]');
    console.log('playItemsElements is:');
    console.log(playItemsElements);
    const datesTitle = [...playItemsElements].find((element) => element.innerText === 'Días de función' || element.innerText ==='Día de función' );
    console.log('datesTitle is:');
    console.log(datesTitle);
    let siblingElements = datesTitle.parentNode.getElementsByTagName('p');
    console.log('siblingElements is:');
    console.log(siblingElements);
    if ([...siblingElements].length === 1) {
      console.log('Many dates case')
      siblingElements = datesTitle.parentNode.getElementsByTagName('div');
      const hoverLink = siblingElements[2]
      event = new MouseEvent('mouseenter')
      hoverLink.dispatchEvent(event)
      const datesString = document.querySelector('div[class*="dias__funcion__detalle"]').innerText
      console.log('Dates String')
      console.log(datesString)
      return datesString.split('\n');
    } else {
      console.log('One date case')
      return siblingElements[1].innerText.split('\n')
    }
  });

  console.log('Extracted info is:')
  console.log({
    title,
    theater,
    synopsis,
    imageURL,
    dates,
    prices,
    category,
    pageURL,
  })

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
}

module.exports = getPlaysInfo;
