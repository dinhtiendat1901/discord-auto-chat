const reply = require('./reply-function');
const createPage = require('./create-page');
const waitMessage = require('./wait-message');


(async () => {
    const page = await createPage('https://discord.com/channels/749295485008871565/749295485008871568', 'dinhtiendat1901@gmail.com', 'Keysersoze1@', './section');

    await page.exposeFunction('handleNewMessage', async (text, id) => {
        await reply(page, 'Hoai Khong', text, ' chao ban nhe', id);
    });
    await waitMessage(page);

})();