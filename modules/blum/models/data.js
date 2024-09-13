const db = require('../../../fierbase.config.js');
const { convertToPlainObject } = require('../../../helpers/convertToPlainObject.js');
const { currentDateInArmenia } = require('../../../helpers/currentDateInArmenia.js');
const BlumLogsModel = require('./logs.js');

class BlumDataModel {
    async set_request(request) {
        try {
            const logDoc = await db.collection('blum').doc('data').collection('request').doc(parseInt(currentDateInArmenia()).toString());
            await logDoc.set(convertToPlainObject(request));
        } catch (error) {
            BlumLogsModel.set_log('setBlumRequest_error', error);
        }
    }

    async set_response(response) {
        try {
            const logDoc = await db.collection('blum').doc('data').collection('response').doc(parseInt(currentDateInArmenia()).toString());
            await logDoc.set(convertToPlainObject(response));
        } catch (error) {
            BlumLogsModel.set_log('setBlumRequest_error', error);
        }
    }
}

module.exports = new BlumDataModel;