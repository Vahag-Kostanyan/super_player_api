const { canClime } = require('../helpers/can');
const { coinsServiceServiceInstance } = require('../services/coinsService');
const {rouletteServiceInstance} = require('../services/rouletteService');
const { swipeCoinsServiceServiceInstance } = require('../services/swipeCoinsService');


class MajorController {
    async roulette(req, res, next) {
        try {
            if (await canClime()) {
                await rouletteServiceInstance.run();
                res.json({ status: 200, message: 'Roulette sended successfully' });
            } else {
                res.json({ status: 200, message: 'It is too early or status is false' });
            }
        } catch (error) {
            next(error);
        }
    }

    async coins(req, res, next) {
        try {
            if (await canClime()) {
                await coinsServiceServiceInstance.run();
                res.json({ status: 200, message: 'Coins sended successfully' });
            } else {
                res.json({ status: 200, message: 'It is too early or status is false' });
            }
        } catch (error) {
            next(error);
        }
    }

    async swipe_coin(req, res, next) {
        try {
            if (await canClime()) {
                await swipeCoinsServiceServiceInstance.run();
                res.json({ status: 200, message: 'Coins sended successfully' });
            } else {
                res.json({ status: 200, message: 'It is too early or status is false' });
            }
        } catch (error) {
            next(error);
        }

    }
}


module.exports = new MajorController;