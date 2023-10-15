const Browser = require('./browser');
const PageController = require('./pageController');

// Create instances of the classes
const browser = new Browser();
const pageController = new PageController(browser);

// Start the browser and scrape pages
pageController.scrapeAll();