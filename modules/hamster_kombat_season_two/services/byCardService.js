const { sendSendNotification } = require('../../../api/sendNotification.js');
const { currentDateInArmenia } = require('../../../helpers/currentDateInArmenia.js');
const HamsterKombatSeasonTwoConfigsModel = require('../models/configs.js');

class HamsterKombatSeasonTwoByCardService {
    async run() {
        let configs = await HamsterKombatSeasonTwoConfigsModel.getConfigs();

        await configs.forEach(async (config) => {
            if (this.canClime(config)) {
                await this.checkAndBy(config);
                await setTimeout(() => {}, 200);
            }
        });
    }

    async checkAndBy(config) {
        const data = await this.getCardForByData(config);
        
        if(data.upgradeId){
            let card = await this.byCard(data, config.token);
            card = await card.json();
            sendSendNotification(`cade with id ${data.upgradeId} has been purchased for user with name ${config.name}` );
        }
    }


    async getCardForByData (config) {
        let requestOptions = this.prepareRequestOptions(config.token);

        let userRes = await fetch('https://api.hamsterkombatgame.io/interlude/sync', requestOptions);
        let userData = await userRes.json();
        
        let res = await fetch('https://api.hamsterkombatgame.io/interlude/upgrades-for-buy', requestOptions);
        let data = await res.json();
        let dataId = null;
        let name = null;
        let profit = 0;        

        for(const item of data?.upgradesForBuy){
            if(
                item.isAvailable &&
                !item.isExpired &&
                !item?.cooldownSeconds &&
                profit < item.profitPerHourDelta &&
                item.price < config.maxPrice &&
                item.price < userData.interludeUser.balanceDiamonds &&
                (config.byRate / 100) * item.price <= item.currentProfitPerHour
            ){
                profit = item.profitPerHourDelta;
                dataId = item.id;
                name = item.name;
            }
        }
        
        return {
            upgradeId: dataId,
            timestamp: currentDateInArmenia()
        };
    }

    async byCard(data, token){
        let requestOptions = this.prepareRequestOptions(token, data);

        return await fetch('https://api.hamsterkombatgame.io/interlude/buy-upgrade', requestOptions);
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

    canClime(config){
        if(config.status) return true;
        return false;
    }
}

module.exports = new HamsterKombatSeasonTwoByCardService;