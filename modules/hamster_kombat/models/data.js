import db from '../../../fierbase.config.js'
import { convertToPlainObject } from '../../../helpers/convertToPlainObject.js';
import { currentDateInArmenia } from '../../../helpers/currentDateInArmenia.js';
import HamsterKombatLogsModel from './logs.js';

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

export default new HamsterKombatDataModel;