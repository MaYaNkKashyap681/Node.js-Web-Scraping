const fs = require('fs')

class PaginatedScraping {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async scrape(browser) {
        const page = await browser.newPage();
        const results = [];

        try {
            await page.goto(this.baseUrl);

            await page.waitForSelector('.table');
            // Use page.evaluate to get the number of pages
            const numPages = await page.$$eval('ul.pagination > li', (items) => items.length);
            console.log(numPages);
            for (let page_num = 1; page_num <= 10; page_num++) {
                const url = `${this.baseUrl}?page_num=${page_num}`;
                console.log(`Navigating to ${url}...`);
                await page.goto(url);

                // Wait for the data to load

                const teamsNameData = await page.$$eval('.team', (data) => {
                    return data.map((item) => {
                        const x = item.querySelector('.name').textContent.trim();
                        return x;
                    });
                });
                results.push(...teamsNameData);
            }
            let str = "";

            results.forEach((elem) => {
                const data = `"${elem}",\n`;
                str += data;
            })

            fs.writeFileSync('./teams.js', `const teamsList = [ \n${str}\n]`, () => {
                console.log("Data Saved");
            })
        } catch (error) {
            console.error("An error occurred:", error);
        } finally {
            await browser.close();
        }
    }
}

module.exports = PaginatedScraping;
