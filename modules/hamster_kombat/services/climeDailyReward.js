
const HamsterKombatConfigsModel = require('../models/configs.js');
const HamsterKombatDataModel = require('../models/data.js');
const HamsterKombatLogsModel = require('../models/logs.js');
const HamsterClaimDailyRewardModel = require('../models/climeDailyReward.js');
const { sendSendNotification } = require('../../../api/sendNotification.js');

class ClaimDailyRewardService {
    async claimDailyReward() {
        const tokens = await HamsterKombatConfigsModel.tokens();

        await tokens.forEach(async token => {
            await setTimeout(async () => {
                await this.send(token);
            }, 3000);
        });

        HamsterClaimDailyRewardModel.set_last_clime();
    }

    async send(token) {
        const requestOptions = await this.prepareRequestOptions(token);
        const url = "https://api.hamsterkombatgame.io/clicker/check-task";
        await HamsterKombatDataModel.set_request({ url, requestOptions });

        await fetch(url, requestOptions)
            .then((response) => response.json())
            .then(async result => {
                await HamsterKombatDataModel.set_response(result);

                if(result.error_code){
                    await sendSendNotification('Something went wrong, please check the logs');
                }else{
                    await sendSendNotification('Reward Claimed successfully');
                }
            })
            .catch(async error => {
                HamsterKombatLogsModel.set_log('from_sendRequest_catch', error);
                await sendSendNotification('Something went wrong, please check the logs on HamsterKombat');
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
            taskId: 'streak_days'
        });

        return {
            method: "POST",
            headers: headers,
            body: raw,
            redirect: "follow",
        };
    }


}


module.exports = new ClaimDailyRewardService;