const db = require('../../../fierbase.config.js');
const { currentDateInArmenia } = require('../../../helpers/currentDateInArmenia.js');
const PSPLogsModel = require('./logs');

class PSPConfigsModel {
    async last_clime() {
        const data = (await db.collection("psp").doc("configs").get()).data();
        return data.lastClime;
    }

    async set_last_clime() {
        try {
            const doc = await db.collection('psp').doc('configs')
            await doc.update({ lastClime: currentDateInArmenia() });
        } catch (error) {
            PSPLogsModel.set_log('getPSPTokens_error', error);
        }
    }

    async clime_intervale() {
        const data = (await db.collection("psp").doc("configs").get()).data();
        return data.climeIntervale;
    }

    async tokens() {
        const data = (await db.collection("psp").doc("configs").get()).data();
        return data.tokens;
    }
}

module.exports = new PSPConfigsModel;