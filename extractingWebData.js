const puppeteer = require('puppeteer');

(async() => {
    try {
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();

        // Navigate to the page
        await page.goto("http://google.com");

        // Extract images
        const images = await page.$$eval("img", imgs =>
            imgs.map(img => ({
                src: img.src,
                alt: img.alt
            }))
        );

        // Extract links
        const links = await page.$$eval("a", links =>
            links.map(link => ({
                href: link.href,
                text: link.textContent
            }))
        );

        const imageCount = images.length;
        const linkCount = links.length;

        console.log(images,links,imageCount,linkCount);
        
        await browser.close();
    } catch (error) {
        console.log(error);
    }
})();