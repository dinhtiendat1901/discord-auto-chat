const puppeteer = require('puppeteer');
const reply = require('./reply-function');
const createPage = require('./create-page');


(async () => {
    const page = await createPage('https://discord.com/channels/749295485008871565/749295485008871568', 'dinhtiendat1901@gmail.com', 'Keysersoze1@');

    await page.waitForSelector('[data-list-id="chat-messages"]');
    await page.waitForSelector('.messageListItem-ZZ7v6g', {visible: true});


    await page.exposeFunction('handleNewMessage', async (text, id) => {
        await reply(page, 'Hoai Khong', text, ' chao ban nhe', id);
    });

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

})();