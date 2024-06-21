const { currentDateInArmenia } = require('../../../helpers/currentDateInArmenia.js');
const HamsterKombatConfigs = require('../models/configs.js');
const ConfigsModel = require('../../../models/configs.js');

const canClime = async () => {
    const clime_intervale = await HamsterKombatConfigs.clime_intervale();
    const lastClime =  await HamsterKombatConfigs.last_clime();

    if(clime_intervale + lastClime  <= currentDateInArmenia() && await ConfigsModel.hamster_kombat_status()) return true;
    return false;
}

module.exports = {canClime};