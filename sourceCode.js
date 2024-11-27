const puppeteer = require('puppeteer');
const fs = require('fs');

const generateSourceCode = async (URL, outputPath) => {
    try {
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();

        // Navigate to the desired page
        await page.goto(URL);

        // Get source code for the page
        const sourceCode = await page.content();

        // Save it into a file
        fs.writeFileSync(outputPath, sourceCode, "utf-8");

        await browser.close();
    } catch (error) {
        console.log(error);
        console.log('Ooops.., Unable to generate the source code for the page');
    }
};

let url = 'https://example.com';
let outputPath = 'sourceCode.html';

generateSourceCode(url, outputPath);