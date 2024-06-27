const { canClime } = require("../helpers/can");
const climeService = require("../services/climeService");

class PSPController {
    async clime (req, res, next) {
        try {
            if (await canClime()) {
                await climeService.clime();
                res.json({ status: 200, message: 'sended successfully' });
            }else{
                res.json({ status: 200, message: 'It is too early or status is false' });
            }
        } catch (error) {
            next(error);
        }  
    }
}

module.exports = new PSPController;