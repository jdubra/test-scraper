require('./sequelize');
require('./api');

const browserObject = require('./browser');
const scraperController = require('./controllers/pageController');

// Start the browser and create a browser instance
const browserInstance = browserObject.startBrowser();

// Pass the browser instance to the scraper controller
scraperController(browserInstance);
