module.exports = async function (page, functionName) {
    await page.evaluate((func) => {
        const target = document.querySelector('[data-list-id="chat-messages"]');
        const observer = new MutationObserver(mutations => {
            if (mutations.length > 45) {
                for (const mutation of mutations) {
                    if (mutation.type === 'childList') {
                        window[func](mutation.addedNodes.item(0).id);
                    }
                }
                observer.disconnect();
            }
        });
        observer.observe(target, {childList: true});
    }, functionName);
}