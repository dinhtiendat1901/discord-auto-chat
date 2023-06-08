const reply = require('./reply-function');
const createPage = require('./create-page');
const waitMessage = require('./wait-message');


(async () => {
    const page = await createPage('https://discord.com/channels/749295485008871565/749295485008871568', 'dinhtiendat1901@gmail.com', 'Keysersoze1@', './section');
    const page1 = await createPage('https://discord.com/channels/749295485008871565/749295485008871568', 'georgiawelsh1971en@gmail.com', 'Jav123456', './section1');


    await Promise.all([page.exposeFunction('handleNewMessage', async (text, id) => {
        await reply(page, 'Hoai Khong', text, '   CHAO HOAI KHONG', id);
    }), page1.exposeFunction('handleNewMessage1', async (text, id) => {
        await reply(page1, 'dinhtiendat1901', text, '  CHAO DINHTIENDAT1901', id);
    })]);

    await Promise.all([waitMessage(page, 'handleNewMessage'), waitMessage(page1, 'handleNewMessage1')]);


})();