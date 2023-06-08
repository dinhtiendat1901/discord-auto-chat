module.exports = async function (page, username, password) {
    try {
        await page.waitForSelector('div.userActions-2T4MMd > button.button-ejjZWC');
        const loginButton = await page.$('div.userActions-2T4MMd > button.button-ejjZWC');
        await new Promise(r => setTimeout(r, 500));
        await loginButton.click();
        await page.waitForSelector('.inputDefault-Ciwd-S[name="email"]');
        await page.waitForSelector('.inputDefault-Ciwd-S[name="password"]');
        await page.type('.inputDefault-Ciwd-S[name="email"]', username);
        await page.type('.inputDefault-Ciwd-S[name="password"]', password);
        await page.keyboard.press('Enter');
    } catch (e) {
        console.log('No need login');
    }
}