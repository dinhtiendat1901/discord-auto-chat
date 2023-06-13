const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const createPage = require("./create-page");
const filterMessage = require('./filter-message');
const waitMessage = require('./wait-message');

let listConversation = [];

let subListConversation = [];

(async () => {
    const page = await createPage(process.env.CHANNEL, process.env.USER, process.env.PASSWORD, './section');
    const chatBoxEH = await page.$('[data-list-id="chat-messages"]');
    const listMessageEH = await chatBoxEH.$$('.messageListItem-ZZ7v6g');
    for (const messageEH of listMessageEH) {
        const conversationObj = await filterMessage(messageEH);
        if (conversationObj) {
            listConversation.push(conversationObj);
        }
    }

    await page.exposeFunction('handleMessage', async (id) => {
        const messageEH = await chatBoxEH.$('#' + id);
        const conversationObj = await filterMessage(messageEH);
        if (conversationObj) {
            subListConversation.push(conversationObj);
        }
    });


    setInterval(async () => {
        if (listConversation.length < 20) {
            await waitMessage(page, 'handleMessage');
            await page.locator('.scroller-kQBbkU').scroll({scrollTop: 1});
            setTimeout(() => {
                listConversation = [...subListConversation, ...listConversation];
                subListConversation = [];
            }, 3000);
        }
    }, 5000);


})();


