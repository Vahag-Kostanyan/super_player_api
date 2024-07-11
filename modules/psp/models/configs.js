const db = require('../../../fierbase.config.js');
const { currentDateInArmenia } = require('../../../helpers/currentDateInArmenia.js');
const PSPLogsModel = require('./logs');

class PSPConfigsModel {
    async getConfigs() {
        const snapshot = await db.collection("psp").doc("new_configs").collection("configs").get();
        const configs = new Map();
    
        snapshot.forEach(doc => {
            configs.set(doc.id, doc.data());
        });

        return configs;
    }

    async updateConfigsLastClime(id) {
        try {
            const ref = await db.collection("psp").doc("new_configs").collection("configs").doc(String(id));

            await ref.update({
                lastClime: currentDateInArmenia()
            });

        } catch (error) {
            PSPLogsModel.set_log('setPSPTokens_error', error);
        }

    }
}

module.exports = new PSPConfigsModel;