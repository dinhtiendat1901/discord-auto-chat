module.exports = async function (page, messageForReply, idMessageNeedReply) {
    await page.waitForSelector('#' + idMessageNeedReply, {visible: true});
    const replyTargetEH = await page.$('#' + idMessageNeedReply);
    const listUserNameEH = await replyTargetEH.$$('.username-h_Y3Us');
    if (listUserNameEH.length > 0) {
        const userNameEH = listUserNameEH[listUserNameEH.length - 1];
        const userName = await (await userNameEH.getProperty('textContent')).jsonValue();
        page.currentUser = userName;
        if (userName === page.targetUser && listUserNameEH.length === 1) {
            await reply(page, replyTargetEH, messageForReply);
        }
    }
    if (listUserNameEH.length === 0) {
        if (page.targetUser === page.currentUser) {
            await reply(page, replyTargetEH, messageForReply);
        }
    }
}

async function reply(page, replyTarget, messageForReply) {
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