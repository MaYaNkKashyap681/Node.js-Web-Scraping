const PageScraper = require('./pageScraper');

class PageController {
  constructor(browser) {
    this.browser = browser;
    this.scraper = new PageScraper('http://books.toscrape.com');
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
