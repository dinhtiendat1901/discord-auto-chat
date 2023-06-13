const puppeteer = require('puppeteer');
const login = require('./login-function');

module.exports = async function (url, username, password, userDataDir) {
    const browser = await puppeteer.launch({
        headless: false,
        // args: ['--start-maximized'],
        defaultViewport: null,
        userDataDir: userDataDir
    });
    const page = await browser.newPage();
    page.setDefaultTimeout(3000);
    page.setDefaultNavigationTimeout(30000);
    await page.goto(url);
    await login(page, username, password);
    await page.waitForSelector('[data-list-id="chat-messages"]', {visible: true, timeout: 30000});
    await page.waitForSelector('.messageListItem-ZZ7v6g', {visible: true, timeout: 30000});
    console.log(`${username} READY!!!!`);
    return page;
}