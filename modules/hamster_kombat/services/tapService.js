const { currentDateInArmenia } = require('../../../helpers/currentDateInArmenia.js');
const { sendHamsterKombatSuccessNotification } = require('../api/sendNotification.js');
const HamsterKombatConfigsModel = require('../models/configs.js');
const HamsterKombatDataModel = require('../models/data.js');
const HamsterKombatLogsModel = require('../models/logs.js');

class TapService {
    async tap() {
        let tokens = await HamsterKombatConfigsModel.tokens();

        tokens.forEach(async token => {
            await this.send(token);
        });
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
                await sendHamsterKombatSuccessNotification(); 
            })
            .catch(error => {
                HamsterKombatLogsModel.set_log('from_sendRequest_catch', error);
            })
            .finally(() => {
                HamsterKombatConfigsModel.set_last_clime();
            });
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
        };;
    }
}

module.exports = new TapService;