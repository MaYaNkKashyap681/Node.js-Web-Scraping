class Scraper {
	constructor(url) {
		this.url = url;
	}
	async scrape(browser) {
		let page = await browser.newPage();
		console.log(`Navigating to ${this.url}...`);
		await page.goto(this.url);
		await page.waitForSelector('.page_inner');
		let urls = await page.$$eval('section ol > li', links => {
		links = links.filter(link => link.querySelector('.instock.availability > i').textContent !== "In stock")
		links = links.map(el => el.querySelector('h3 > a').href)
		return links;
		});
		console.log(urls);
	}
}

module.exports = Scraper;
