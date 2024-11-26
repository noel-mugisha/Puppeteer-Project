const puppeteer = require('puppeteer');

const generateScreenshot = async (URL, outputPath) => {
    try {
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();

        // Navigate to the page
        await page.goto(URL, {timeout: 60000});

        // Take the screenshot
        await page.screenshot({path: outputPath});
        console.log("Screenshot taken successfully!!");

        // Close the browser
        await browser.close();

    } catch (error) {
        console.log(error);
        console.log("Unable to take screenshot");
    }
}

let url = 'http://yahoo.com';
let screenshotFile = 'yahoo.png';

generateScreenshot(url,screenshotFile);