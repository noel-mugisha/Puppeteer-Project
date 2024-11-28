const puppeteer = require ('puppeteer');

const device = puppeteer.KnownDevices['iPhone 13 Pro Max'];

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    await page.emulate(device);
    await page.goto('http://yahoo.com', {waitUntil: 'domcontentloaded', timeout: 60000});
    await page.screenshot({path: 'iphone_device.png'});
    console.log('Taken the screenshot successfully...');

    await browser.close();
})();