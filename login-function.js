module.exports = async function (page, username, password) {
    try {
        await page.waitForSelector('.button-ejjZWC');
        const loginButton = await page.$('.button-ejjZWC');
        await new Promise(r => setTimeout(r, 500));
        await loginButton.click();
        await page.waitForSelector('#uid_6');
        await page.waitForSelector('#uid_8');
        await page.type('#uid_6', username);
        await page.type('#uid_8', password);
        await page.keyboard.press('Enter');
    } catch (e) {
        console.log('No need login');
    }
}