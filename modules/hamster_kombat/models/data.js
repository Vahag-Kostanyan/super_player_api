const db = require('../../../fierbase.config.js');
const { convertToPlainObject } = require('../../../helpers/convertToPlainObject.js');
const { currentDateInArmenia } = require('../../../helpers/currentDateInArmenia.js');
const HamsterKombatLogsModel = require('./logs.js');

class HamsterKombatDataModel {
    async set_request(request) {
        try {
            const logDoc = await db.collection('hamster_kombat').doc('data').collection('request').doc(parseInt(currentDateInArmenia()).toString());
            await logDoc.set(convertToPlainObject(request));
        } catch (error) {
            HamsterKombatLogsModel.set_log('setHamsterKombatRequest_error', error);
        }
    }

    async set_response(response) {
        try {
            const logDoc = await db.collection('hamster_kombat').doc('data').collection('responsee').doc(parseInt(currentDateInArmenia()).toString());
            await logDoc.set(convertToPlainObject(response));
        } catch (error) {
            HamsterKombatLogsModel.set_log('setHamsterKombatRequest_error', error);
        }
    }
}

module.exports = new HamsterKombatDataModel;