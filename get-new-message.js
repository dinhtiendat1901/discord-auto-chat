const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const createPage = require("./create-page");
const filterMessage = require('./filter-message');
const waitMessage = require('./wait-message');
const listConversation = require('./list-conversation');


module.exports = async function () {
    const page = await createPage(process.env.CHANNEL, process.env.USER, process.env.PASSWORD, './section');


    await page.exposeFunction('handleMessage', async (id) => {
        const messageEH = await page.$('#' + id);
        const conversationObj = await filterMessage(messageEH);
        if (conversationObj) {
            listConversation.push(conversationObj);
        }
    });

    await waitMessage(page, 'handleMessage');

}