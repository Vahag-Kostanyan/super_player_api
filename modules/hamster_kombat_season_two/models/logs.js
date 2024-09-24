const db = require('../../../fierbase.config.js');
const { convertToPlainObject } = require('../../../helpers/convertToPlainObject.js');
const { currentDateInArmenia } = require('../../../helpers/currentDateInArmenia.js');

class HamsterKombatSeasonTwoLogsModel {
    async set_log(status, message) {
        const logDoc = await db.collection('hasmter_kombat_season_two').doc('logs').collection('data').doc(parseInt(currentDateInArmenia()).toString());
        await logDoc.set(convertToPlainObject({ status, message }));
    }
}

module.exports = new HamsterKombatSeasonTwoLogsModel;