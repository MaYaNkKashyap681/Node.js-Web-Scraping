const fs = require('fs')

class CountryScrapper {
    constructor(url) {
        this.url = url;
    }

    async scrape(browser) {
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
        await page.goto(this.url);

        await page.waitForSelector('#countries');

        let countriesData = await page.$$eval('.col-md-4.country', (data) => {
            const c_data = data.map((item) => {
                const x = item.querySelector('.country-name').textContent.trim(); // Use trim() to remove leading/trailing whitespace
                const y = item.querySelector('.country-area').textContent;
                return { "Country": x, "Area": y };
            });
            return c_data;
        });
  
        let str = "";

        countriesData.forEach((elem) => {
            const data = `{"Country" : "${elem.Country}" , "Area" : ${parseInt(elem.Area)}},\n`;
            str+=data;
        })

        fs.writeFileSync('./data.js', `const countriesData = [ \n${str}\n]`, () => {
            console.log("Data Saved");
        })
    }
}

module.exports = CountryScrapper