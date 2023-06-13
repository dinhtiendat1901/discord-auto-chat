const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const createPage = require("./create-page");
const filterMessage = require('./filter-message');
const waitMessage = require('./wait-message');
let listConversation = require('./list-conversation');


module.exports = async function () {
    const page = await createPage(process.env.CHANNEL, process.env.USER1, process.env.PASSWORD1, './section1');
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
            listConversation.unshift(conversationObj);
        }
    });

    setInterval(async () => {
        if (listConversation.length < 20) {
            await waitMessage(page, 'handleMessage');
            await page.locator('.scroller-kQBbkU').scroll({scrollTop: 1});
        }
    }, 5000);
}


