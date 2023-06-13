module.exports = async function (page, message) {
    await page.type('.markup-eYLPri', message);
    await page.keyboard.press('Enter');
    page.ready = false;
    await new Promise(r => setTimeout(r, 1000));
    await page.waitForFunction('document.querySelector(".cooldownWrapper-2k1jHK").innerText === "Slowmode is enabled." || document.querySelector(".cooldownWrapper-2k1jHK").innerText === "" ', {timeout: 1000000000});
    page.ready = true;
    console.log('Page ready!!!');
}