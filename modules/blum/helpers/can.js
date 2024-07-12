const ConfigsModel = require('../../../models/configs');

const canClime = async () => {
    if(await ConfigsModel.blum_status()) return true;
    return false;
}

module.exports = {canClime};