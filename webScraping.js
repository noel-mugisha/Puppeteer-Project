const puppeteer = require('puppeteer');
const fs = require('fs');

const scrapeUrl = async (URL, outputPath = 'scrapedData.json') => {
    try {
        console.log(`Launching browser...`);
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();

        console.log(`Navigating to URL: ${URL}`);
        await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });

        console.log(`Scraping data from the page...`);
        const data = await page.evaluate(() => {
            const titleElement = document.querySelector('h1');
            const descriptionElement = document.querySelector('p');

            const title = titleElement ? titleElement.textContent.trim() : 'No title found';
            const description = descriptionElement
                ? descriptionElement.textContent.trim()
                : 'No description found';

            return { title, description };
        });

        console.log(`Data scraped:`, data);

        console.log(`Writing data to file: ${outputPath}`);
        fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
        console.log(`Data successfully written to ${outputPath}`);

        console.log(`Closing browser...`);
        await browser.close();
    } catch (error) {
        console.error(`An error occurred:`, error.message);
    }
};

// Call the function with the URL to scrape
scrapeUrl('https://example.com');
