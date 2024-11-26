const puppeteer = require('puppeteer');

const generatePdf = async (URL, outputFile) => {
    try {
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        
        // Navigate to the page
        await page.goto(URL);

        // Generate pdf
        await page.pdf({path: outputFile, format: 'A4'});

        // Close the browser
        await browser.close();
    } catch (error) {
        console.log(error);
    }
};

let url = "http://google.com";
let outputFile = "output.pdf";

generatePdf(url, outputFile);

