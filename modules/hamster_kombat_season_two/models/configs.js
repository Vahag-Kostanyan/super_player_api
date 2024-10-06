const db = require('../../../fierbase.config.js');
const { currentDateInArmenia } = require('../../../helpers/currentDateInArmenia.js');
const PocketFiLogsModel = require('./logs');

class HamsterKombatSeasonTwoConfigsModel {
    async getConfigs() {
        const snapshot = await db.collection("hasmter_kombat_season_two").doc("configs").collection("configs").get();
        const configs = new Map();
    
        snapshot.forEach(doc => {
            configs.set(doc.id, doc.data());
        });

        return configs;
    }

    async updateConfigsLastClime(id) {
        try {
            const ref = await db.collection("hasmter_kombat_season_two").doc("configs").collection("configs").doc(String(id));

            await ref.update({
                lastClime: currentDateInArmenia()
            });

        } catch (error) {
            PocketFiLogsModel.set_log('HamsterKombatSeasonTwo_updateConfigsLastClime_error', error);
        }

    }
}

module.exports = new HamsterKombatSeasonTwoConfigsModel;