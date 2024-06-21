const express = require('express');
const HamsterKombatController = require('./modules/hamster_kombat/controllers/controller.js');

const router = express.Router();

router.get('/', (req, res) => res.json({ status: 200, message: 'Server working' }));

router.get('/hamster_kompat/tap', HamsterKombatController.tap);

module.exports = router;