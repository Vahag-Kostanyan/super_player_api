const { currentDateInArmenia } = require('../../../helpers/currentDateInArmenia.js');
const { sendSendNotification } = require('../../../api/sendNotification.js');
const HamsterKombatConfigsModel = require('../models/configs.js');

class ByService {
    async by() {
        let tokens = await HamsterKombatConfigsModel.tokens();

        await tokens.forEach(async token => {
            await this.checkAndBy(token, token);
        });
    }

    async checkAndBy(token) {
        const data = await this.getCardForByData(token);
        
        if(data.upgradeId){
            let card = await this.byCard(data, token);
            card = await card.json();
            sendSendNotification(`cade with id ${data.upgradeId} has been purchased` );
        }
    }


    async getCardForByData (token) {
        let requestOptions = this.prepareRequestOptions(token);

        let userRes = await fetch('https://api.hamsterkombatgame.io/clicker/sync', requestOptions);
        let userData = await userRes.json();

        
        let res = await fetch('https://api.hamsterkombatgame.io/clicker/upgrades-for-buy', requestOptions);
        let data = await res.json();
        let dataId = null;

        for(const item of data?.upgradesForBuy){
            if(item.price / 1000 <= item.profitPerHourDelta && item.price < userData.clickerUser.balanceCoins){
                dataId = item.id;
                break;
            }
        }
        
        return {
            upgradeId: dataId,
            timestamp: currentDateInArmenia()
        };
    }

    async byCard(data, token){
        let requestOptions = this.prepareRequestOptions(token, data);

        return await fetch('https://api.hamsterkombatgame.io/clicker/buy-upgrade', requestOptions);
    }

    prepareRequestOptions(token, data = {}) {
        const headers = new Headers();
        headers.append(
            "Authorization",
            "Bearer " + token
        );
        headers.append("Content-Type", "application/json");

        return {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data),
            redirect: "follow",
        };
    }
}

module.exports = new ByService;