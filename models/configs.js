const db = require('../fierbase.config.js');

class ConfigsModel {
    async hamster_kombat_status() {
        const data = (await db.collection("configs").doc("hamster_kombat").get()).data();
        return data.status;
    }

    async psp_status() {
        const data = (await db.collection("configs").doc("psp").get()).data();
        return data.status;
    }

    async blum_status() {
        const data = (await db.collection("configs").doc("blum").get()).data();
        return data.status;
    }
    
    async pocketFi_status() {
        const data = (await db.collection("configs").doc("pocketFi").get()).data();
        return data.status;
    }

    async major_status() {
        const data = (await db.collection("configs").doc("major").get()).data();
        return data.status;
    }
}

module.exports = new ConfigsModel;