
const HamsterKombatConfigsModel = require('../models/configs.js');
const HamsterKombatDataModel = require('../models/data.js');
const HamsterKombatLogsModel = require('../models/logs.js');
const HamsterClaimDailyCipherModel = require('../models/claimDailyCipher.js');
const { sendSendNotification } = require('../../../api/sendNotification.js');

class ClaimDailyCipherService {
    async claimDailyCipher(req) {
        const tokens = await HamsterKombatConfigsModel.tokens();
        const cipher = req.body.cipher;

        await tokens.forEach(async token => {
            await setTimeout(async () => {
                await this.send(token, cipher);
            }, 3000);
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

                if(result.error_code){
                    await sendSendNotification('Something went wrong, please check the logs');
                }else{
                    await sendSendNotification('claimed successfully');
                }
            })
            .catch(async error => {
                HamsterKombatLogsModel.set_log('from_sendRequest_catch', error);
                await sendSendNotification('Something went wrong, please check the logs on HamsterKombat');
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