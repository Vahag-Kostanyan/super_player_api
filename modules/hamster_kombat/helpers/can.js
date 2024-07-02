const { currentDateInArmenia } = require('../../../helpers/currentDateInArmenia.js');
const HamsterKombatConfigs = require('../models/configs.js');
const HamsterKombatClaimDailyCipher = require('../models/claimDailyCipher.js');
const HamsterKombatClimeDailyReward = require('../models/climeDailyReward.js');
const ConfigsModel = require('../../../models/configs.js');

const canClime = async () => {
    const clime_intervale = await HamsterKombatConfigs.clime_intervale();
    const lastClime =  await HamsterKombatConfigs.last_clime();

    if(clime_intervale + lastClime  <= currentDateInArmenia() && await ConfigsModel.hamster_kombat_status()) return true;
    return false;
}

const canClaimDailyCipher = async () => {
    const clime_intervale = await HamsterKombatClaimDailyCipher.clime_intervale();
    const lastClime =  await HamsterKombatClaimDailyCipher.last_clime();

    if(clime_intervale + lastClime  <= currentDateInArmenia() && await ConfigsModel.hamster_kombat_status()) return true;
    return false;
}

const canClimeDailyReward = async () => {
    const clime_intervale = await HamsterKombatClimeDailyReward.clime_intervale();
    const lastClime =  await HamsterKombatClimeDailyReward.last_clime();

    if(clime_intervale + lastClime  <= currentDateInArmenia() && await ConfigsModel.hamster_kombat_status()) return true;
    return false;
}

module.exports = {canClime, canClaimDailyCipher, canClimeDailyReward};