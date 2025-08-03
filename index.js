import puppeteer from 'puppeteer';
// Or import puppeteer from 'puppeteer-core';

function delay(min, max) {
    return new Promise(resolve => setTimeout(resolve, getRandomInt(min, max)));
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Launch the browser and open a new blank page
const browser = await puppeteer.launch({
    headless: false
});
const page = await browser.newPage();

// Navigate the page to a URL.
await page.goto('https://developer.chrome.com/');

// Set screen size.
await page.setViewport({width: 1080, height: 1024});
await delay(1000, 2000);

// Type into search box using accessible input name.
await page.locator('aria/Search').fill('automate beyond recorder');
await delay(1000, 2000);

// Wait and click on first result.
await page.locator('.devsite-result-item-link').click();
await delay(1000, 2000);
// Locate the full title with a unique string.
const textSelector = await page
    .locator('text/Customize and automate')
    .waitHandle();

await delay(1000, 2000);
const fullTitle = await textSelector?.evaluate(el => el.textContent);

await delay(1000, 2000);
// Print the full title.
console.log('The title of this blog post is "%s".', fullTitle);

await browser.close();
