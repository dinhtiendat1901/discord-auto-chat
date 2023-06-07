module.exports = async function (page) {
    await page.waitForSelector('[data-list-id="chat-messages"]');
    await page.waitForSelector('.messageListItem-ZZ7v6g', {visible: true});
    await page.evaluate(() => {
        const target = document.querySelector('[data-list-id="chat-messages"]');
        const observer = new MutationObserver(mutations => {
            for (const mutation of mutations) {
                if (mutation.type === 'childList') {
                    handleNewMessage(mutation.addedNodes.item(0).textContent, mutation.addedNodes.item(0).id);
                }
            }
        });
        observer.observe(target, {childList: true});
    });
}