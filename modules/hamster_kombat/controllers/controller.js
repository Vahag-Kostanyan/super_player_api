const { canClime } = require('../helpers/canClime.js');
const TapService = require('../services/tapService.js');

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
}

module.exports = new HamsterKombatController();
