const express = require('express');
const router = express.Router();
const controller = require('../controllers/aiController');
const auth = require('../middleware/auth');

router.post('/generate', auth, controller.generatePlan);

module.exports = router;
