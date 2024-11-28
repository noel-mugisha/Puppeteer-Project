const puppeteer = require('puppeteer');

const simulateMobileDevice = async (URL) => {
    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();

        // Set a proper iPhone User-Agent string
        await page.setUserAgent(
            'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1'
        );

        // Set viewport to match iPhone screen dimensions
        await page.setViewport({ width: 375, height: 812, isMobile: true });

        // Navigate to the URL
        await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });

        console.log(`Navigated to ${URL} in mobile simulation mode.`);

        await page.screenshot({path: 'mobile_device.png'});

        console.log("Took screenshot of the mobilde device simulation");

        // Close the browser
        await browser.close();
    } catch (error) {
        console.error("Error:", error.message);
    }
};

// Call the function with the target URL
simulateMobileDevice('http://yahoo.com');
