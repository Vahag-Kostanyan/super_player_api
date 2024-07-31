const db = require('../../../fierbase.config.js');
const { convertToPlainObject } = require('../../../helpers/convertToPlainObject.js');
const { currentDateInArmenia } = require('../../../helpers/currentDateInArmenia.js');

class PocketFiLogsModel {
    async set_log(status, message) {
        const logDoc = await db.collection('pocketFi').doc('logs').collection('data').doc(parseInt(currentDateInArmenia()).toString());
        await logDoc.set(convertToPlainObject({ status, message }));
    }
}

module.exports = new PocketFiLogsModel;