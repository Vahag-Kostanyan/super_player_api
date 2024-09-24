const { sendSendNotification } = require('../../../api/sendNotification.js');
const { currentDateInArmenia } = require('../../../helpers/currentDateInArmenia.js');
const HamsterKombatSeasonTwoConfigsModel = require('../models/configs.js');

class HamsterKombatSeasonTwoClimeService {
    async run() {
        let configs = await HamsterKombatSeasonTwoConfigsModel.getConfigs();

        await configs.forEach(async (config) => {
            if (this.canClime(config)) {
                await this.clime(config);
            }
        });
    }

    async clime(config) {
        console.log(config);

        const requestOptions = this.prepareRequestOptions(config.token);

        const res = await fetch('https://api.hamsterkombatgame.io/interlude/sync', requestOptions);        
        
        if(res.status === 200){
            await sendSendNotification('Hamster Kombat Balance updated successfully for user ' + config.name ); 
        }else{
            await sendSendNotification('Something went wrong, please check the logs on hamster_kombat_season_two for user' + config.name);
        }

        await HamsterKombatSeasonTwoConfigsModel.updateConfigsLastClime(config.id);
    }

    prepareRequestOptions(token) {
        const headers = new Headers();

        headers.append(
            "Authorization",
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

    canClime(config){
        console.log(config.climeIntervale, config.lastClime, config.id , currentDateInArmenia());
        
        if(config.climeIntervale + config.lastClime  <= currentDateInArmenia() && config.status) return true;
        return false;
    }
}

module.exports = new HamsterKombatSeasonTwoClimeService;