const { sendSendNotification } = require('../../../api/sendNotification.js');
const { currentDateInArmenia } = require('../../../helpers/currentDateInArmenia.js');
const blumConfigsModule = require('../models/configs.js');
const BlumDataModel = require('../models/data.js');
const BlumBaseService = require('./baseService.js');

class climeAndFarmService extends BlumBaseService  {

    async triggerAction (config) {
        if(this.canClime(config)) await this.clime(config);
        if(this.canFarm(config)) await this.farm(config);
    }

    async clime(config) {
        const url = "https://game-domain.blum.codes/api/v1/farming/claim";
        let requestOptions = this.prepareRequestOptions('POST', config.token);

        await BlumDataModel.set_request({ url, requestOptions });
        let res = await fetch(url, requestOptions);

        if(res.status === 200){
            await sendSendNotification(`Blum clime done for player ${config.name}`);
            await blumConfigsModule.updateConfigsLastClime(config.id);
        }else{
            console.log('clime');
            let resData = await res.json();
            console.log("clime", resData);
            await sendSendNotification(`Blum clime failed for player ${config.name} with this result ${JSON.stringify(resData)}`);
        }
    }

    async farm(config) {
        const url = "https://game-domain.blum.codes/api/v1/farming/start";
        let requestOptions = this.prepareRequestOptions('POST', config.token);

        await BlumDataModel.set_request({ url, requestOptions });
        let res = await fetch(url, requestOptions);

        if(res.status === 200){
            await sendSendNotification(`Blum farm done for player ${config.name}`);
            await blumConfigsModule.updateConfigsLastFarm(config.id);
        }else{
            console.log('farm');
            let resData = await res.json();
            console.log("farm", resData);
            await sendSendNotification(`Blum farm failed for player ${config.name} with this result ${JSON.stringify(resData)}`);
        }
    }


    can(config) {
        if (this.canClime(config) || this.canFarm(config)) return true;
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
}

module.exports = new climeAndFarmService;