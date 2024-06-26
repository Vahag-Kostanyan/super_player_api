
const { sendHamsterKombatSendNotification } = require('../api/sendNotification.js');
const HamsterKombatConfigsModel = require('../models/configs.js');
const HamsterKombatDataModel = require('../models/data.js');
const HamsterKombatLogsModel = require('../models/logs.js');
const HamsterClaimDailyCipherModel = require('../models/claimDailyCipher.js');

class ClaimDailyCipherService {
    async claimDailyCipher(req) {
        const tokens = await HamsterKombatConfigsModel.tokens();
        const cipher = req.body.cipher;

        await tokens.forEach(async token => {
            await this.send(token, cipher);
        });

        HamsterClaimDailyCipherModel.set_last_clime();
    }

    async send(token, cipher) {
        const requestOptions = await this.prepareRequestOptions(token, cipher);
        const url = "https://api.hamsterkombat.io/clicker/claim-daily-cipher";

        await HamsterKombatDataModel.set_request({ url, requestOptions });

        await fetch(url, requestOptions)
            .then((response) => response.json())
            .then(async result => {
                await HamsterKombatDataModel.set_response(result);
                await sendHamsterKombatSendNotification('Claimed successfully');
            })
            .catch(async error => {
                HamsterKombatLogsModel.set_log('from_sendRequest_catch', error);
                await sendHamsterKombatSendNotification('Something went wrong, please check the logs');
            });
    }

    prepareRequestOptions(token, cipher) {
        const headers = new Headers();
        headers.append(
            "Authorization",
            "Bearer " + token
        );
        headers.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            cipher
        });

        return {
            method: "POST",
            headers: headers,
            body: raw,
            redirect: "follow",
        };
    }


}


module.exports = new ClaimDailyCipherService;