const { currentDateInArmenia } = require('../../../helpers/currentDateInArmenia.js');
const MajorConfigModule = require('../models/configs.js');
const MajorBaseService = require('./baseService.js');

class CoinsService extends MajorBaseService {

    playUrl = 'https://major.bot/api/bonuses/coins/';
    playName = 'coins';

    prepareRequestObject() {
        const coins = Math.floor(Math.random() * (2800 - 800 + 1)) + 800;
        return { coins };
    }

    async updateConfigs(config) {
        await MajorConfigModule.updateConfigsCoinLastClime(config.id);
        await MajorConfigModule.updateConfigsToken(config.id, config.token);
    }

    can(config) {
        if ((config?.climeIntervale + config?.coinsLastClime) <= currentDateInArmenia() && config.status) return true;
        return true;
    }

}


module.exports = {
    CoinsService,
    coinsServiceServiceInstance: new CoinsService
}