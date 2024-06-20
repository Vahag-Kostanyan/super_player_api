import { canClime } from '../helpers/canClime.js';
import TapService from '../services/tapService.js';

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

export default new HamsterKombatController();