// const PageScraper = require('./pageScraper');
// const CountryScraper = require('./countryScraper')
const PaginatedScraping = require('./paginatedScraping')

class PageController {
  constructor(browser) {
    this.browser = browser;
    // this.scraper = new PageScraper('http://books.toscrape.com');
    // this.scraper = new CountryScraper('https://www.scrapethissite.com/pages/simple/')
    this.scraper = new PaginatedScraping('https://www.scrapethissite.com/pages/forms/')
  }

  async scrapeAll() {
    try {
      await this.browser.startBrowser();
      await this.scraper.scrape(this.browser.browser);
    } catch (err) {
      console.log("Could not resolve the browser instance => ", err);
    }
  }
}

module.exports = PageController;