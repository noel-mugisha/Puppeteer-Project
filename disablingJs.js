const puppeteer = require('puppeteer');

const disableJs = async (URL) => {
    try {
        const browser = await puppeteer.launch({headless: false});
        const page= await browser.newPage();

        // Disable javascript for the page you want to go to
        await page.setJavaScriptEnabled(false);
        
        await page.goto(URL);
        await page.close();

        console.log("Javascript disabled succesfully..");
    } catch (error) {
        console.log(error);
    }
}

disableJs("http://example.com");