const { can } = require("../helpers/can");
const ClimeAndFarmService = require('../services/climeAndFarmService.js');

class BlumController {
    async climeAndFarm (req, res, next) {
        try{
            if(await can()){
                await ClimeAndFarmService.run();
                res.json({ status: 200, message: 'sended successfully' });
            }else{
                res.json({ status: 200, message: 'It is too early or status is false' });
            }
        }catch(error) {
            next(error);
        }
    }
}

module.exports = new BlumController;