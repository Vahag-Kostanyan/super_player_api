const { sendSendNotification } = require('../../../api/sendNotification.js');
const { currentDateInArmenia } = require('../../../helpers/currentDateInArmenia.js');
const blumConfigsModule = require('../models/configs.js');
const BlumDataModel = require('../models/data.js');
const BlumLogsModel = require('../models/logs.js');

class climeAndFarmService {
    async climeAndFarmService() {
        const configs = await blumConfigsModule.getConfigs();

        await configs.forEach(async (config, index) => {
            if (await this.canCLime(config)) {
                await this.worker(config, index);
            }
        });
    }

    async worker(config, index) {
        const requestOptions = await this.prepareRequestOptions(config.token);

        await this.clime(requestOptions)
        .then((response) => response.json())
        .then(async result => {
            await BlumDataModel.set_response(result);
            await sendSendNotification(config.name + ' Blum Balance updated successfully');
            await this.farm(requestOptions, config, index);
        })
        .catch(async error => {
            console.log(error);
            await BlumLogsModel.set_log('from_sendRequest_catch', error);
            await sendSendNotification('Something went wrong, please check the logs on Blum for user' + config.name);
        });
    }

    async clime(requestOptions) {
        const url = "https://game-domain.blum.codes/api/v1/farming/claim";

        await BlumDataModel.set_request({ url, requestOptions });

        return fetch(url, requestOptions)
    }

    async farm(requestOptions, config, index) {
        const url = "https://game-domain.blum.codes/api/v1/farming/start";

        await BlumDataModel.set_request({ url, requestOptions });

        await fetch(url, requestOptions)
            .then((response) => response.json())
            .then(async result => {
                await BlumDataModel.set_response(result);
                await sendSendNotification(config.name + ' Blum Balance updated successfully');
                await blumConfigsModule.updateConfigsLastClime(index);
            })
            .catch(async error => {
                await BlumLogsModel.set_log('from_sendRequest_catch', error);
                await sendSendNotification('Something went wrong, please check the logs on Blum for user' + config.name);
            });
    }


    prepareRequestOptions(token) {
        const headers = new Headers();

        headers.append(
            "Autehorization",
            "Bearer " + token
        );
        headers.append("Content-Type", "application/json");

        const raw = JSON.stringify({});

        return {
            method: "POST",
            headers: headers,
            body: raw,
            redirect: "follow",
        };
    }


    async canCLime(config) {
        if (config.climeIntervale + config.lastClime <= currentDateInArmenia() && config.status) return true;
        return false;
    }
}

module.exports = new climeAndFarmService;