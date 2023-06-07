module.exports = async function (page, targetName, messageNeedReply, messageForReply, idMessageNeedReply) {
    if (messageNeedReply.startsWith(targetName)) {
        await page.waitForSelector('#' + idMessageNeedReply, {visible: true});
        const replyTarget = await page.$('#' + idMessageNeedReply);
        await new Promise(r => setTimeout(r, 500));
        await replyTarget.click({button: 'right'});
        await page.waitForSelector('#message-reply', {visible: true});
        await page.evaluate(() => {
            const replyButton = document.getElementById('message-reply');
            replyButton.click();
        })
        await page.type('.markup-eYLPri', messageForReply);
        await page.keyboard.press('Enter');
    }
}