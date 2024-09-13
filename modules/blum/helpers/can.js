const ConfigsModel = require('../../../models/configs');

const can = async () => {
    if(await ConfigsModel.blum_status()) return true;
    return false;
}

module.exports = {can};