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
    await page.goto(url);
    await login(page, username, password);
    await page.waitForSelector('.username-h_Y3Us', {visible: true, timeout: 30000});
    const listUserEH = await page.$$('.username-h_Y3Us');
    const lastUserEH = listUserEH[listUserEH.length - 1];
    page.currentUser = await (await lastUserEH.getProperty('textContent')).jsonValue();
    page.targetUser = '';
    console.log(`${username} READY!!!!`);
    return page;
}