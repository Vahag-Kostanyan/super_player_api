import { Router } from "express";
import HamsterKombatController from './modules/hamster_kombat/controllers/controller.js';

const router = Router();

router.get('/', (req, res) => res.json({ status: 200, message: 'Server working' }));

router.get('/hamster_kompat/tap', HamsterKombatController.tap);

export default router;