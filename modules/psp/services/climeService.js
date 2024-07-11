const { sendSendNotification } = require('../../../api/sendNotification.js');
const { currentDateInArmenia } = require('../../../helpers/currentDateInArmenia.js');
const PSPConfigsModel = require('../models/configs.js');
const PSPDataModel = require('../models/data.js');
const PSPLogsModel = require('../models/logs.js');

class ClimeService {
    async clime() {
        let configs = await PSPConfigsModel.getConfigs();

        await configs.forEach(async (config, index) => {
            if(await this.canClime(config)){
                await this.send(config);
                await PSPConfigsModel.updateConfigsLastClime(index);
            }
        });
    }

    async send(config) {
        const requestOptions = await this.prepareRequestOptions(config.token);
        const url = "https://sappers-api.olish.info/user/claim";

        await PSPDataModel.set_request({ url, requestOptions });

        await fetch(url, requestOptions)
            .then((response) => response.json())
            .then(async result => {
                await PSPDataModel.set_response(result);
                await sendSendNotification(config.name + ' PSP Balance updated successfully');
            })
            .catch(async error => {
                await PSPLogsModel.set_log('from_sendRequest_catch', error);
                await sendSendNotification('Something went wrong, please check the logs on PSP for user' + config.name);
            });
    }

    prepareRequestOptions(token) {
        const headers = new Headers();

        headers.append("Auth", token);
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