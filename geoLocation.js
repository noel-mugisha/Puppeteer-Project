const puppeteer = require('puppeteer');

const getGeoLocation = async (URL) => {
    try {
        // Launch Puppeteer browser
        const browser = await puppeteer.launch({
            headless: false, // Run in non-headless mode for visibility
            args: ['--disable-notifications'], // Disable unnecessary browser notifications
        });

        // Open a new browser page
        const page = await browser.newPage();

        // Geolocation coordinates (Kigali, Rwanda)
        const latitude = 1.9403;
        const longitude = 29.8739;

        // Override geolocation permissions for the URL
        const context = browser.defaultBrowserContext();
        await context.overridePermissions(URL, ['geolocation']);

        // Set geolocation data
        await page.setGeolocation({ latitude, longitude });

        // Navigate to the target URL
        await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });

        // Take a screenshot of the loaded page
        const screenshotPath = 'geolocation_example.png';
        await page.screenshot({ path: screenshotPath });

        console.log(`Screenshot saved at ${screenshotPath}`);

        // Close the browser
        await browser.close();
    } catch (error) {
        // Handle any errors during execution
        console.error(`Error occurred: ${error.message}`);
    }
};

// Example usage of the function
getGeoLocation('https://maps.google.com');
