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

    async updateConfigsToken(id, token) {
        try {
            const ref = await db.collection("blum").doc("configs").collection("configs").doc(String(id));

            await ref.update({
                token: token
            });

        } catch (error) {
            BlumLogsModel.set_log('setBlumTokens_error', error);
        }

    }

    async updateConfigsLastClime(id) {
        try {
            const ref = await db.collection("blum").doc("configs").collection("configs").doc(String(id));

            await ref.update({
                lastClime: currentDateInArmenia()
            });

        } catch (error) {
            BlumLogsModel.set_log('setBlum_updateConfigsLastClime_error', error);
        }
    }

    async updateConfigsLastFarm(id) {
        try {
            const ref = await db.collection("blum").doc("configs").collection("configs").doc(String(id));

            await ref.update({
                lastFarm: currentDateInArmenia()
            });

        } catch (error) {
            BlumLogsModel.set_log('setBlum_updateConfigsLastFarm_error', error);
        }
    }

    async updateConfigsLastReward(id) {
        try {
            const ref = await db.collection("blum").doc("configs").collection("configs").doc(String(id));

            await ref.update({
                lastClimeReward: currentDateInArmenia()
            });

        } catch (error) {
            BlumLogsModel.set_log('setBlum_updateConfigsLastReward_error', error);
        }
    }
}

module.exports = new BlumConfigsModel;