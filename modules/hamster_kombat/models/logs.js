const db = require('../../../fierbase.config.js');
const { convertToPlainObject } = require('../../../helpers/convertToPlainObject.js');
const { currentDateInArmenia } = require('../../../helpers/currentDateInArmenia.js');

class HamsterKombatLogsModel {
    async set_log(status, message) {
        const logDoc = await db.collection('hamster_kombat').doc('logs').collection('data').doc(parseInt(currentDateInArmenia()).toString());
        await logDoc.set(convertToPlainObject({ status, message }));
    }
}

module.exports = new HamsterKombatLogsModel;