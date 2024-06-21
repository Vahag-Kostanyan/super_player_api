const db = require('../../../fierbase.config.js');
const { currentDateInArmenia } = require('../../../helpers/currentDateInArmenia.js');
const HamsterKombatLogsModel = require('./logs');

class HamsterKombatConfigsModel {
    async last_clime() {
        const data = (await db.collection("hamster_kombat").doc("configs").get()).data();
        return data.lastClime;
    }

    async set_last_clime() {
        try {
            const doc = await db.collection('hamster_kombat').doc('configs')
            await doc.update({ lastClime: currentDateInArmenia() });
        } catch (error) {
            HamsterKombatLogsModel.set_log('getHamsterKombatTokens_error', error);
        }
    }

    async clime_intervale() {
        const data = (await db.collection("hamster_kombat").doc("configs").get()).data();
        return data.climeIntervale;
    }

    async tokens() {
        const data = (await db.collection("hamster_kombat").doc("configs").get()).data();
        return data.tokens;
    }
}

module.exports = new HamsterKombatConfigsModel;