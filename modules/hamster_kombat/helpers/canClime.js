import { currentDateInArmenia } from '../../../helpers/currentDateInArmenia.js';
import HamsterKombatConfigs from '../models/configs.js';
import ConfigsModel from '../../../models/configs.js'

export const canClime = async () => {
    const clime_intervale = await HamsterKombatConfigs.clime_intervale();
    const lastClime =  await HamsterKombatConfigs.last_clime();

    if(clime_intervale + lastClime  <= currentDateInArmenia() && await ConfigsModel.hamster_kombat_status()) return true;
    return false;
}