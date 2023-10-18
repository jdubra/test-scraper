const scraperObject = {
	url: 'https://www.plateanet.com/home',
	async scraper(browser){
    //Open browser
		let page = await browser.newPage();
    //Navigate to site
		console.log(`Navigating to ${this.url}...`);
		await page.goto(this.url, {timeout: 0});
    console.log('Cargó la página, busco selector')
    //Wait for page to load
    await page.waitForSelector('[class*="contenedorprincipal"]');
    console.log('Encontré selector')
    //Click on "Ver más" button
    const clickSeeMore = async () => {
      const seeMoreButton = await page.$('span.vinculos.vermas_home');
      if (seeMoreButton) {
        await seeMoreButton.click();
        return true;
      }
      return false;
    };
    //Load all plays
    let morePlays = true;
    while (morePlays) {
      console.log('comienza click more')
      morePlays = await clickSeeMore();
      console.log('termina click more')
      if (morePlays) {
        await page.waitForTimeout(2000);
      }
    }
    console.log('no hay más obras!!!')
		let parentElements = await page.$$eval('img.w-100', elements => {
      elements.forEach(async (element) => {
        console.log('Element is:')
        console.log(element)
        await element.parentElement.click()
      });
      return elements;
		});
	}
}

module.exports = scraperObject;
