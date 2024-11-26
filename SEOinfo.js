const puppeteer = require('puppeteer');
const fs = require('fs');

(async() => {
    try {
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        
        // Navigate to the page with increased timeout
        await page.goto('http://yahoo.com', { waitUntil: 'domcontentloaded', timeout: 60000 });

        // SEO data
        const title = await page.title();
        const metaDescription = await page.$eval('meta[name="description"]', el => el.textContent);
        const metaKeywords = await page.$eval('meta[name="keywords"]', el => el.textContent);

        // Extract images
        const images = await page.$$eval('img', imgs => 
            imgs.map(img => ({
                src: img.src,
                alt: img.alt
            }))
        );

        // Extract links
        const links = await page.$$eval('a', links => 
            links.map(link => ({
                href: link.href,
                text: link.textContent,
            }))
        );

        let imageCount = images.length;
        let linkCount = links.length;

        const outputData = {
            title,
            metaDescription,
            metaKeywords,
            images,
            links,
            imageCount,
            linkCount
        };

        console.log(outputData);

        // Convert JSON into a string
        const outputJSON = JSON.stringify(outputData, null, 2);
        // Write to a file
        fs.writeFileSync('output.json', outputJSON);

        await browser.close();

    } catch (error) {
        console.log(error);
    }
})();
