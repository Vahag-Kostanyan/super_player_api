const { sendSendNotification } = require('../../../api/sendNotification.js');
const { currentDateInArmenia } = require('../../../helpers/currentDateInArmenia.js');
const HamsterKombatConfigsModel = require('../models/configs.js');
const HamsterKombatDataModel = require('../models/data.js');
const HamsterKombatLogsModel = require('../models/logs.js');

class TapService {
    async tap() {
        let tokens = await HamsterKombatConfigsModel.tokens();

        await tokens.forEach(async token => {
            await this.send(token);
        });

        HamsterKombatConfigsModel.set_last_clime();
    }

    async send(token) {
        const requestOptions = await this.prepareRequestOptions(token);
        const url =  "https://api.hamsterkombat.io/clicker/tap";
        
        await HamsterKombatDataModel.set_request({url, requestOptions});

        await fetch(url, requestOptions)
            .then((response) => response.json())
            .then(async result => {
                if (!result?.clickerUser) {
                    return HamsterKombatLogsModel.set_log('from_sendRequest_then', result);
                }
                await HamsterKombatDataModel.set_response(result);
                await sendSendNotification('Hamster Kombat Balance updated successfully'); 
            })
            .catch(async error => {
                await HamsterKombatLogsModel.set_log('from_sendRequest_catch', error);
                await sendSendNotification('Something went wrong, please check the logs on HamsterKombat'); 
            })
    }

    prepareRequestOptions(token) {
        const headers = new Headers();
        headers.append(
            "Authorization",
            "Bearer " + token
        );
        headers.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            count: 900,
            availableTaps: 0,
            timestamp: parseInt(currentDateInArmenia() / 1000),
        });

        return {
            method: "POST",
            headers: headers,
            body: raw,
            redirect: "follow",
        };
    }
}

module.exports = new TapService;