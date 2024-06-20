import db from '../../../fierbase.config.js'

class HamsterKombatConfigsModel {
    async last_clime() {
        const data = (await db.collection("hamster_kombat").doc("configs").get()).data();
        return data.lastClime;
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

export default new HamsterKombatConfigsModel;