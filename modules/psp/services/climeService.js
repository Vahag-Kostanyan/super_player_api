const { sendSendNotification } = require('../../../api/sendNotification.js');
const PSPConfigsModel = require('../models/configs.js');
const PSPDataModel = require('../models/data.js');
const PSPLogsModel = require('../models/logs.js');

class ClimeService {
    async clime() {
        let tokens = await PSPConfigsModel.tokens();

        await tokens.forEach(async token => {
            await setTimeout(async () => {
                await this.send(token);
            }, 1000);
        });

        PSPConfigsModel.set_last_clime();
    }

    async send(token) {
        const requestOptions = await this.prepareRequestOptions(token);
        const url = "https://sappers-api.olish.info/user/claim";

        await PSPDataModel.set_request({ url, requestOptions });

        await fetch(url, requestOptions)
            .then((response) => response.json())
            .then(async result => {
                await PSPDataModel.set_response(result);
                await sendSendNotification('PSP Balance updated successfully');
            })
            .catch(async error => {
                await PSPLogsModel.set_log('from_sendRequest_catch', error);
                await sendSendNotification('Something went wrong, please check the logs on PSP');
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
}

module.exports = new ClimeService;