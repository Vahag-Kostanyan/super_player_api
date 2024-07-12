const db = require('../../../fierbase.config.js');
const { currentDateInArmenia } = require('../../../helpers/currentDateInArmenia.js');
const BlumLogsModel = require('./logs.js');

class BlumConfigsModel {
    async getConfigs() {
        const snapshot = await db.collection("blum").doc("configs").collection("configs").get();
        const configs = new Map();
    
        snapshot.forEach(doc => {
            configs.set(doc.id, doc.data());
        });

        return configs;
    }

    async updateConfigsLastClime(id) {
        try {
            const ref = await db.collection("blum").doc("configs").collection("configs").doc(String(id));

            await ref.update({
                lastClime: currentDateInArmenia()
            });

        } catch (error) {
            BlumLogsModel.set_log('setBlumTokens_error', error);
        }

    }
}

module.exports = new BlumConfigsModel;