const { currentDateInArmenia } = require('../../../helpers/currentDateInArmenia.js');
const MajorConfigModule = require('../models/configs.js');
const MajorBaseService = require('./baseService.js');


class RouletteService extends MajorBaseService {

    playUrl = 'https://major.glados.app/api/roulette/';
    playName = 'roulette';

    prepareRequestObject () {
        return {};
    }

    async updateConfigs(config){
        await MajorConfigModule.updateConfigsRouletteLastClime(config.id);
        await MajorConfigModule.updateConfigsToken(config.id, config.token);
    }

    can(config) {
        if ((config?.climeIntervale + config?.rouletteLastClime) <= currentDateInArmenia() && config.status) return true;
        return false;
    }
}


module.exports={
    RouletteService,
    rouletteServiceInstance: new RouletteService 
}