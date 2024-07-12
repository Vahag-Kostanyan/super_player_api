const blumConfigsModule = require('../models/configs.js');
const BlumDataModel = require('../models/data.js');
const BlumLogsModel = require('../models/logs.js');

class climeAndFarmService {
    async climeAndFarmService() {
        const configs = await blumConfigsModule.getConfigs();

        await configs.forEach(async config => {
            if (this.canCLime(config)) {
                await this.worker(config);
            }
        });
    }

    async worker(config) {
        const requestOptions = await this.prepareRequestOptions(config.token);

        await this.clime(requestOptions);
        await this.farm(requestOptions);
    }

    async clime(requestOptions) {
        const url = "https://game-domain.blum.codes/api/v1/farming/claim";

        await BlumDataModel.set_request({ url, requestOptions });

        await fetch(url, requestOptions)
            .then((response) => response.json())
            .then(async result => {
                await BlumDataModel.set_response(result);
                await sendSendNotification(config.name + ' Blum Balance updated successfully');
            })
            .catch(async error => {
                await BlumLogsModel.set_log('from_sendRequest_catch', error);
                await sendSendNotification('Something went wrong, please check the logs on Blum for user' + config.name);
            });
    }

    async farm(requestOptions) {
        const url = "https://game-domain.blum.codes/api/v1/farming/start";

        await BlumDataModel.set_request({ url, requestOptions });

        await fetch(url, requestOptions)
            .then((response) => response.json())
            .then(async result => {
                await BlumDataModel.set_response(result);
                await sendSendNotification(config.name + ' Blum Balance updated successfully');
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
            "Bearer " + tokn
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