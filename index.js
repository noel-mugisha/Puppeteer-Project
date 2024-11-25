const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: false,
        userDataDir: "./tmp"
    });
    const page = await browser.newPage();
    await page.goto('https://www.amazon.com/s?rh=n%3A16225007011&fs=true&ref=lp_16225007011_sar');

        const productHandles = await page.$$('div.s-main-slot.s-result-list.s-search-results.sg-row');

        try {
            for (const productHandle of productHandles) {
                const title = await page.evaluate( (el) => el.querySelector("h2 > a > span").textContent, productHandle);
                const price = await page.evaluate(
                    (el) => el.querySelector(".a-price > .a-offscreen").textContent, productHandle
                );
                console.log (price);
            }
        } catch (error) {
            console.log(error);
        }

    await page.screenshot({path: 'example.png'});

    await browser.close();
})();

