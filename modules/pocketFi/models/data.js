const db = require('../../../fierbase.config.js');
const { convertToPlainObject } = require('../../../helpers/convertToPlainObject.js');
const { currentDateInArmenia } = require('../../../helpers/currentDateInArmenia.js');
const PocketFiLogsModel = require('./logs.js');

class PocketFiDataModel {
    async set_request(request) {
        try {
            const logDoc = await db.collection('pocketFi').doc('data').collection('request').doc(parseInt(currentDateInArmenia()).toString());
            await logDoc.set(convertToPlainObject(request));
        } catch (error) {
            PocketFiLogsModel.set_log('setPocketFiModelRequest_error', error);
        }
    }

    async set_response(response) {
        try {
            const logDoc = await db.collection('pocketFi').doc('data').collection('response').doc(parseInt(currentDateInArmenia()).toString());
            await logDoc.set(convertToPlainObject(response));
        } catch (error) {
            PocketFiLogsModel.set_log('setPocketFiRequest_error', error);
        }
    }
}

module.exports = new PocketFiDataModel;