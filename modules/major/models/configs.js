const db = require('../../../fierbase.config.js');
const { currentDateInArmenia } = require('../../../helpers/currentDateInArmenia.js');
const MajorLogsModel = require('./logs');

class MajorConfigsModel {
    async getConfigs() {
        const snapshot = await db.collection("major").doc("configs").collection("configs").get();
        const configs = new Map();

        snapshot.forEach(doc => {
            configs.set(doc.id, doc.data());
        });

        return configs;
    }

    async updateConfigsRouletteLastClime(id) {
        try {
            const ref = await db.collection("major").doc("configs").collection("configs").doc(String(id));

            await ref.update({
                rouletteLastClime: currentDateInArmenia()
            });

        } catch (error) {
            MajorLogsModel.set_log('setMajorLastClime_error', error);
        }
    }

    async updateConfigsCoinLastClime(id) {
        try {
            const ref = await db.collection("major").doc("configs").collection("configs").doc(String(id));

            await ref.update({
                coinsLastClime: currentDateInArmenia()
            });

        } catch (error) {
            MajorLogsModel.set_log('setMajorLastClime_error', error);
        }
    }

    async updateConfigsSwipeCoinLastClime(id) {
        try {
            const ref = await db.collection("major").doc("configs").collection("configs").doc(String(id));

            await ref.update({
                swipe_coinLastClime: currentDateInArmenia()
            });

        } catch (error) {
            MajorLogsModel.set_log('setMajorLastClime_error', error);
        }
    }

    async updateConfigsToken(id, token) {
        try {
            const ref = await db.collection("major").doc("configs").collection("configs").doc(String(id));

            await ref.update({ token });

        } catch (error) {
            MajorLogsModel.set_log('setMajorToken_error', error);
        }
    }
}

module.exports = new MajorConfigsModel;