const { can } = require("../helpers/can");
const HamsterKombatSeasonTwoClimeService = require('../services/climeService.js');
const HamsterKombatSeasonTwoByCardervice = require('../services/byCardService.js');

class HamsterKombatSeasonTwoController {
    async climeCoins(req, res, next){
        try{
            if(await can()){
                await HamsterKombatSeasonTwoClimeService.run();
                res.json({ status: 200, message: 'sended successfully' });
            }else{
                res.json({ status: 200, message: 'It is too early or status is false' });
            }
        }catch(error){
            next(error);
        }
    }

    async byCard(req, res, next){
        try{
            if(await can()){
                await HamsterKombatSeasonTwoByCardervice.run();
                res.json({ status: 200, message: 'sended successfully' });
            }else{
                res.json({ status: 200, message: 'It is too early or status is false' });
            }
        }catch(error){
            next(error);
        }
    }
}

module.exports = new HamsterKombatSeasonTwoController;