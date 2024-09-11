const { currentDateInArmenia } = require('../../../helpers/currentDateInArmenia.js');
const MajorConfigModule = require('../models/configs.js');
const MajorBaseService = require('./baseService.js');

class SwipeCoinsService extends MajorBaseService {

    playUrl = 'https://major.bot/api/swipe_coin/';
    playName = 'swipe_coin';

    prepareRequestObject() {
        const coins = Math.floor(Math.random() * (2800 - 800 + 1)) + 800;
        return { coins };
    }

    async updateConfigs(config) {
        await MajorConfigModule.updateConfigsSwipeCoinLastClime(config.id);
        await MajorConfigModule.updateConfigsToken(config.id, config.token);
    }

    can(config) {
        if ((config?.climeIntervale + config?.swipe_coinLastClime) <= currentDateInArmenia() && config.status) return true;
        return true;
    }

}


module.exports = {
    SwipeCoinsService,
    swipeCoinsServiceServiceInstance: new SwipeCoinsService
}