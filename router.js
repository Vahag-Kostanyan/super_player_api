const express = require('express');
const HamsterKombatController = require('./modules/hamster_kombat/controllers/controller.js');
const PSPController = require('./modules/psp/controllers/controller.js');
const PocketFiController = require('./modules/pocketFi/controllers/controller.js');

const router = express.Router();

router.get('/', (req, res) => res.json({ status: 200, message: 'Server working' }));

router.get('/hamster_kompat/tap', HamsterKombatController.tap);
router.get('/hamster_kombat/byCard', HamsterKombatController.byCard);
router.post('/hamster_kompat/claim-daily-cipher', HamsterKombatController.claimDailyCipher);
router.get('/hamster_kompat/claim-daily-reward', HamsterKombatController.climeDailyReward);

router.get('/psp/clime', PSPController.clime);
router.get('/pocket-fi/clime', PocketFiController.clime);

module.exports = router;