const { sendSendNotification } = require('../../../api/sendNotification');
const { currentDateInArmenia } = require('../../../helpers/currentDateInArmenia');
const PocketFiConfigsModel = require('../models/configs');
const PocketFiDataModel = require('../models/data');

class ClimeService {
    async clime() {
        let configs = await PocketFiConfigsModel.getConfigs();

        await configs.forEach(async (config, index) => {
            if (await this.canClime(config)) {
                await this.send(config);
                await PocketFiConfigsModel.updateConfigsLastClime(index);
            }
        });
    }

    async send(config) {
        const requestOptions = await this.prepareRequestOptions(config.token);
        const url = "https://gm.pocketfi.org/mining/claimMining";

        await PocketFiDataModel.set_request({ url, requestOptions });


        await fetch(url, requestOptions)
        .then((response) => response.json())
        .then(async result => {
            await PocketFiDataModel.set_response(result);
            await sendSendNotification(config.name + ' PocketFi Balance updated successfully');
        })
        .catch(async error => {
            await PocketFiDataModel.set_log('from_sendRequest_catch', error);
            await sendSendNotification('Something went wrong, please check the logs on PocketFi for user' + config.name);
        });
    }

    prepareRequestOptions(token) {
        const headers = new Headers();

        headers.append("telegramRawData", token);
        headers.append("Content-Type", "application/json");

        const raw = JSON.stringify({});

        return {
            method: "POST",
            headers: headers,
            body: raw,
            redirect: "follow",
        };
    }



    async canClime(config) {    
        if(config.climeIntervale + config.lastClime  <= currentDateInArmenia() && config.status) return true;
        return false;
    }
}


module.exports = new ClimeService;