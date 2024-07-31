const db = require('../../../fierbase.config.js');
const { currentDateInArmenia } = require('../../../helpers/currentDateInArmenia.js');
const PocketFiLogsModel = require('./logs');

class PocketFiConfigsModel {
    async getConfigs() {
        const snapshot = await db.collection("pocketFi").doc("configs").collection("configs").get();
        const configs = new Map();
    
        snapshot.forEach(doc => {
            configs.set(doc.id, doc.data());
        });

        return configs;
    }

    async updateConfigsLastClime(id) {
        try {
            const ref = await db.collection("pocketFi").doc("configs").collection("configs").doc(String(id));

            await ref.update({
                lastClime: currentDateInArmenia()
            });

        } catch (error) {
            PocketFiLogsModel.set_log('setPocketFiTokens_error', error);
        }

    }
}

module.exports = new PocketFiConfigsModel;