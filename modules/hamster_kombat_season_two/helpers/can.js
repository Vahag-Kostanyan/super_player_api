const ConfigsModel = require('../../../models/configs.js');

const can = async () =>{ 
    if(await ConfigsModel.hamster_kombat_season_two_status()) return true;
    return false
}

module.exports = {can};