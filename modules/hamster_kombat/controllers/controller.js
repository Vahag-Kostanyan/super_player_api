const { canClime, canClaimDailyCipher, canClimeDailyReward } = require('../helpers/can.js');
const TapService = require('../services/tapService.js');
const ClaimDailyCipher = require('../services/claimDailyCipher.js');
const ClaimDailyReward = require('../services/climeDailyReward.js');

class HamsterKombatController {
    async tap(req, res, next) {
        try {
            if (await canClime()) {
                await TapService.tap(next);
                res.json({ status: 200, message: 'sended successfully' });
            }else{
                res.json({ status: 200, message: 'It is too early or status is false' });
            }
        } catch (error) {
            next(error)
        }
    }


    async  claimDailyCipher(req, res, next) {
        try{
            if (await canClaimDailyCipher()) {
                await ClaimDailyCipher.claimDailyCipher(req);
                res.json({ status: 200, message: 'claimed successfully' });
            }else{
                res.json({ status: 200, message: 'It is too early or status is false' });
            }
        }catch(error){
            next(error);
        }
    }

    async  climeDailyReward(req, res, next) {
        try{
            if (await canClimeDailyReward()) {
                await ClaimDailyReward.claimDailyReward();
                res.json({ status: 200, message: 'claimed successfully' });
            }else{
                res.json({ status: 200, message: 'It is too early or status is false' });
            }
        }catch(error){
            next(error);
        }
    }
}

module.exports = new HamsterKombatController();
