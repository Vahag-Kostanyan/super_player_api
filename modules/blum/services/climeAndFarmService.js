const { sendSendNotification } = require('../../../api/sendNotification.js');
const { currentDateInArmenia } = require('../../../helpers/currentDateInArmenia.js');
const blumConfigsModule = require('../models/configs.js');
const PrepareConfigService = require('./prepareConfigService.js');

class climeAndFarmService extends PrepareConfigService  {

    async triggerAction (config) {
        if(this.canClime(config)) await this.clime(config);
        if(this.canFarm(config)) await this.farm(config);
        if(this.canClimeReward(config)) await this.climeReward(config);
    }

    async clime(config) {
        try{
            const url = "https://game-domain.blum.codes/api/v1/farming/claim";
            let requestOptions = this.prepareRequestOptions('POST', config.token);
    
            let res = await fetch(url, requestOptions);
    
            if(res.status === 200){
                await sendSendNotification(`Blum clime done for player ${config.name}`);
                await blumConfigsModule.updateConfigsLastClime(config.id);
            }else{
                const contentType = res.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    // Safely parse JSON
                    let resData = await res.json();
                    await sendSendNotification(`Blum clime failed for player ${config.name} with this result ${JSON.stringify(resData)}`);
                } else {
                    // Handle non-JSON response (e.g., HTML error page)
                    let resText = await res.text();
                    await sendSendNotification(`Blum clime failed for player ${config.name}. Received non-JSON response: ${resText}`);
                }
            }
        }catch(error){
            console.log(error, "clime");
        }
    }

    async farm(config) {
        try{
            const url = "https://game-domain.blum.codes/api/v1/farming/start";
            let requestOptions = this.prepareRequestOptions('POST', config.token);
    
            let res = await fetch(url, requestOptions);
            
            if(res.status === 200){
                await sendSendNotification(`Blum farm done for player ${config.name}`);
                await blumConfigsModule.updateConfigsLastFarm(config.id);
            }else{
                const contentType = res.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    // Safely parse JSON
                    let resData = await res.json();
                    await sendSendNotification(`Blum farm failed for player ${config.name} with this result ${JSON.stringify(resData)}`);
                } else {
                    // Handle non-JSON response (e.g., HTML error page)
                    let resText = await res.text();
                    await sendSendNotification(`Blum farm failed for player ${config.name}. Received non-JSON response: ${resText}`);
                }
            }
        }catch(error){
            console.log(error, "farm");
        }
    }

    async climeReward(config) {
        try{
            const url = "https://game-domain.blum.codes/api/v1/daily-reward?offset=-240";
            let requestOptions = this.prepareRequestOptions('POST', config.token);
    
            let res = await fetch(url, requestOptions);
            
            if(res.status === 200){
                await sendSendNotification(`Blum climeReward done for player ${config.name}`);
                await blumConfigsModule.updateConfigsLastFarm(config.id);
            }else{
                const contentType = res.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    // Safely parse JSON
                    let resData = await res.json();
                    await sendSendNotification(`Blum climeReward failed for player ${config.name} with this result ${JSON.stringify(resData)}`);
                } else {
                    // Handle non-JSON response (e.g., HTML error page)
                    let resText = await res.text();
                    await sendSendNotification(`Blum climeReward failed for player ${config.name}. Received non-JSON response: ${resText}`);
                }
            }
        }catch(error){
            console.log(error, "farm");
        }
    }

    can(config) {
        if (this.canClime(config) || this.canFarm(config) || this.canClimeReward(config)) return true;
        return false;
    }

    canClime(config){
        if (config.climeIntervale + config.lastClime <= currentDateInArmenia() && config.status) return true;
        return false;
    }

    canFarm(config){
        if (config.climeIntervale + config.lastFarm <= currentDateInArmenia() && config.status) return true;
        return false;
    }

    canClimeReward(config){
        if (config.rewardClimeIntervale + config.lastClimeReward <= currentDateInArmenia() && config.status) return true;
        return false;
    }
}

module.exports = new climeAndFarmService;