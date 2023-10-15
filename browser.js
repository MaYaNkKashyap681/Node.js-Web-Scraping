const puppeteer = require('puppeteer');

class Browser {
  constructor() {
    this.browser = null;
  }

  async startBrowser() {
    try {
      console.log("Opening the browser......");
      this.browser = await puppeteer.launch({
        headless: false,
        args: ["--disable-setuid-sandbox"],
        ignoreHTTPSErrors: true
      });
    } catch (err) {
      console.log("Could not create a browser instance => : ", err);
    }
  }
}

module.exports = Browser;