const puppeteer = require('puppeteer');
const login = require('./login-function');

module.exports = async function (url, username, password) {
    const browser = await puppeteer.launch({
        headless: false,
        // args: ['--start-maximized'],
        defaultViewport: null,
        userDataDir: './section'
    });
    const page = await browser.newPage();
    page.setDefaultTimeout(10000);
    await page.goto(url);
    await login(page, username, password);
    return page;
}