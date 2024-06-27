const db = require('../../../fierbase.config.js');
const { convertToPlainObject } = require('../../../helpers/convertToPlainObject.js');
const { currentDateInArmenia } = require('../../../helpers/currentDateInArmenia.js');
const PSPLogsModel = require('./logs.js');

class PSPtDataModel {
    async set_request(request) {
        try {
            const logDoc = await db.collection('psp').doc('data').collection('request').doc(parseInt(currentDateInArmenia()).toString());
            await logDoc.set(convertToPlainObject(request));
        } catch (error) {
            PSPLogsModel.set_log('setPSPRequest_error', error);
        }
    }

    async set_response(response) {
        try {
            const logDoc = await db.collection('psp').doc('data').collection('response').doc(parseInt(currentDateInArmenia()).toString());
            await logDoc.set(convertToPlainObject(response));
        } catch (error) {
            PSPLogsModel.set_log('setPSPRequest_error', error);
        }
    }
}

module.exports = new PSPtDataModel;