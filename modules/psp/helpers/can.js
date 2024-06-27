const { currentDateInArmenia } = require('../../../helpers/currentDateInArmenia.js');
const PSPConfigs = require('../models/configs.js');
const ConfigsModel = require('../../../models/configs.js');

const canClime = async () => {
    const clime_intervale = await PSPConfigs.clime_intervale();
    const lastClime =  await PSPConfigs.last_clime();

    if(clime_intervale + lastClime  <= currentDateInArmenia() && await ConfigsModel.psp_status()) return true;
    return false;
}

module.exports = {canClime};