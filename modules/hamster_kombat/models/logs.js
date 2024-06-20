import db from '../../../fierbase.config.js'
import { convertToPlainObject } from '../../../helpers/convertToPlainObject.js';
import { currentDateInArmenia } from '../../../helpers/currentDateInArmenia.js';

class HamsterKombatLogsModel {
    async set_log(status, message) {
        const logDoc = await db.collection('hamster_kombat').doc('logs').collection('data').doc(parseInt(currentDateInArmenia()).toString());
        await logDoc.set(convertToPlainObject({ status, message }));
    }
}

export default new HamsterKombatLogsModel;