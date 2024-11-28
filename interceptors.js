const puppeteer = require('puppeteer');

const interceptRequest = async (URL) => {
    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();

        // Enable request interception
        await page.setRequestInterception(true);

        // Set up a request event listener
        page.on('request', (request) => {
            if (request.url().endsWith('.png')) {
                request.abort(); // Prevent image requests
                console.log(`Blocked image request: ${request.url()}`);
            } else {
                // Modify headers for other requests
                const headers = {
                    ...request.headers(),
                    'secretKey': 'abc123', // Add a custom header
                };
                request.continue({ headers });
                console.log(`Request continued with custom headers: ${request.url()}`);
            }
        });

        // Navigate to the given URL
        await page.goto(URL);

        // Close the browser
        await browser.close();

        console.log('Request interception completed.');
    } catch (error) {
        console.error('Error:', error);
    }
};

// Call the function
interceptRequest('http://yahoo.com');
