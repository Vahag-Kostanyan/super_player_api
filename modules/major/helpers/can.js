const ConfigsModel = require('../../../models/configs.js');

const canClime = async () => {
    if(await ConfigsModel.major_status()) return true;
    return false;
}

module.exports = {canClime};