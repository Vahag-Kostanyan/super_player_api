const express = require('express');
const HamsterKombatController = require('./modules/hamster_kombat/controllers/controller.js');
const PSPController = require('./modules/psp/controllers/controller.js');

const router = express.Router();

router.get('/', (req, res) => res.json({ status: 200, message: 'Server working' }));

router.get('/hamster_kompat/tap', HamsterKombatController.tap);
router.post('/hamster_kompat/claim-daily-cipher', HamsterKombatController.claimDailyCipher);

router.get('/psp/clime', PSPController.clime);

module.exports = router;