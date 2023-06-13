module.exports = async function (element) {
    const listMessage = await element.$$('.markup-eYLPri');
    if (listMessage.length > 0) {
        for (const message of listMessage) {
            const childElementCount = await (await message.getProperty('childElementCount')).jsonValue();
            if (childElementCount) return;
        }
        if (listMessage.length === 1) {
            const question = await (await listMessage[0].getProperty('textContent')).jsonValue();
            return {question: question};
        }
        if (listMessage.length === 2) {
            const question = await (await listMessage[0].getProperty('textContent')).jsonValue();
            const answer = await (await listMessage[1].getProperty('textContent')).jsonValue();
            return {question: question, answer: answer};
        }
    }
}