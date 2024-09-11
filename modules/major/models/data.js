const db = require('../../../fierbase.config.js');
const { convertToPlainObject } = require('../../../helpers/convertToPlainObject.js');
const { currentDateInArmenia } = require('../../../helpers/currentDateInArmenia.js');
const MajorLogsModel = require('./logs.js');

class MajorDataModel {
    async set_request(request) {
        try {
            const logDoc = await db.collection('major').doc('data').collection('request').doc(parseInt(currentDateInArmenia()).toString());
            await logDoc.set(convertToPlainObject(request));
        } catch (error) {
            MajorLogsModel.set_log('setMajorRequest_error', error);
        }
    }

    async set_response(response) {
        try {
            const logDoc = await db.collection('major').doc('data').collection('response').doc(parseInt(currentDateInArmenia()).toString());
            await logDoc.set(convertToPlainObject(response));
        } catch (error) {
            MajorLogsModel.set_log('setMajorResponse_error', error);
        }
    }
}

module.exports = new MajorDataModel;