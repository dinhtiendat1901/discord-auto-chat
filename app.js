const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const reply = require('./reply-function');
const createPage = require('./create-page');
const waitMessage = require('./wait-message');

const listConversation = [
    {
        question: '   đi học chưa',
        answer: '   chưa đi bạn ạ'
    },
    {
        question: '   anh em vui nhỉ',
        answer: '   cũng bình thường bạn ạ'
    },
    {
        question: '   hết mẹ tiền',
        answer: '   gửi stk tao bơm cho'
    }
];

let currentConversation;

(async () => {
    const page = await createPage(process.env.CHANNEL, process.env.USER, process.env.PASSWORD, './section');
    const page1 = await createPage(process.env.CHANNEL, process.env.USER1, process.env.PASSWORD1, './section1');
    page.targetUser = 'Hoai Khong';
    page1.targetUser = 'dinhtiendat1901';

    await Promise.all([page.exposeFunction('handleNewMessage', async (id) => {
        await reply(page, currentConversation.answer, id);
    }), page1.exposeFunction('handleNewMessage1', async (id) => {
        await reply(page1, currentConversation.answer, id);
    })]);

    await Promise.all([waitMessage(page, 'handleNewMessage'), waitMessage(page1, 'handleNewMessage1')]);
    let currentConverIndex;
    let currentUserIndex;

    setInterval(async () => {
        currentConverIndex = Math.floor(Math.random() * 3);
        currentUserIndex = Math.floor(Math.random() * 2);
        currentConversation = listConversation[currentConverIndex];
        if (currentUserIndex === 0) {
            await page.type('.markup-eYLPri', currentConversation.question);
            await page.keyboard.press('Enter');
        } else {
            await page1.type('.markup-eYLPri', currentConversation.question);
            await page1.keyboard.press('Enter');
        }
    }, 3000);


})();