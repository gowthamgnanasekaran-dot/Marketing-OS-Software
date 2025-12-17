const express = require('express');
const router = express.Router();
const controller = require('../controllers/mopsController');
const auth = require('../middleware/auth');

router.get('/integrations', auth, controller.getIntegrations);
router.post('/utm', auth, controller.createUTM);
router.get('/utm/history', auth, controller.getUTMHistory);

module.exports = router;
