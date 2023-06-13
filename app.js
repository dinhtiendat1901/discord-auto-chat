const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const getNewMessage = require('./get-new-message');
const loadOldMessage = require('./load-old-message');


(async () => {
    await loadOldMessage();
    await getNewMessage();
})();