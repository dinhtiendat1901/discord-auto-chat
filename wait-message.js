module.exports = async function (page, functionName) {
    await page.waitForSelector('[data-list-id="chat-messages"]');
    await page.waitForSelector('.messageListItem-ZZ7v6g', {visible: true});
    await page.evaluate((func) => {
        const target = document.querySelector('[data-list-id="chat-messages"]');
        const observer = new MutationObserver(mutations => {
            for (const mutation of mutations) {
                if (mutation.type === 'childList') {
                    window[func](mutation.addedNodes.item(0).id);
                }
            }
        });
        observer.observe(target, {childList: true});
    }, functionName);
}