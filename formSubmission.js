const puppeteer = require('puppeteer');

const formSubmission = async (URL, searchQuery) => {
    try {
        const browser = await puppeteer.launch({ headless: false });

        // Create a new page using the browser instance
        const page = await browser.newPage();

        // Navigate to the page with extended timeout
        await page.goto(URL, {
            waitUntil: 'domcontentloaded', // Less strict condition for page load
            timeout: 60000 // 60 seconds timeout for navigation
        });

        // Focus on the search input field and type the query
        await page.focus('input[name="p"]');
        await page.keyboard.type(searchQuery);
        await page.keyboard.press('Enter');

        // Wait for the results page to load or a specific selector to appear
        await page.waitForSelector('input[name="p"]', { timeout: 100000 }); // Adjust selector if necessary

        // Take a screenshot of the page that is loaded
        await page.screenshot({ path: 'query_results.png' });

        // Close the browser
        await browser.close();

        console.log("Form data submitted and screenshot captured successfully!!");
    } catch (error) {
        console.error("Error:", error.message);
        console.error('Unable to search on the browser...');
    }
};

const url = 'http://yahoo.com';
const searchQuery = 'Game Of Thrones';

// Call the function with URL and search query
formSubmission(url, searchQuery);
