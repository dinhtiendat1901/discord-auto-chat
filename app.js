const puppeteer = require('puppeteer');


(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        // args: ['--start-maximized'],
        defaultViewport: null,
        userDataDir: './section'
    });


    const page = await browser.newPage();
    await page.goto('https://discord.com/channels/749295485008871565/749295485008871568');
    await page.waitForSelector('[data-list-id="chat-messages"]');
    await page.waitForSelector('.messageListItem-ZZ7v6g', {visible: true});


    await page.exposeFunction('handleNewMessage', async (text, id) => {
        if (text.startsWith('Hoai Khong')) {
            await page.waitForSelector('#' + id, {visible: true});
            const replyTarget = await page.$('#' + id);
            await new Promise(r => setTimeout(r, 1000));
            await replyTarget.click({button: 'right'});
            await page.waitForSelector('#message-reply', {visible: true});
            await page.evaluate(() => {
                const replyButton = document.getElementById('message-reply');
                replyButton.click();
            })
            await page.type('.markup-eYLPri', '  chào bạn!');
            await page.keyboard.press('Enter');
        }
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
        return observer;
    });

})();