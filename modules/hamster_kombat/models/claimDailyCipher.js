const db = require('../../../fierbase.config.js');
const { currentDateInArmenia } = require('../../../helpers/currentDateInArmenia.js');
const HamsterKombatLogsModel = require('./logs');

class HamsterClaimDailyCipherModel {
    async last_clime() {
        const data = (await db.collection("hamster_kombat").doc("claimDailyCipher").get()).data();
        return data.lastClime;
    }

    async set_last_clime() {
        try {
            const doc = await db.collection('hamster_kombat').doc('claimDailyCipher')
            await doc.update({ lastClime: currentDateInArmenia() });
        } catch (error) {
            HamsterKombatLogsModel.set_log('getHamsterKombatTokens_error', error);
        }
    }

    async clime_intervale() {
        const data = (await db.collection("hamster_kombat").doc("claimDailyCipher").get()).data();
        return data.climeIntervale;
    }
}

module.exports = new HamsterClaimDailyCipherModel;