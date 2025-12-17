const express = require('express');
const router = express.Router();
const controller = require('../controllers/campaignController');
const auth = require('../middleware/auth');

router.get('/', auth, controller.getCampaigns);
router.post('/', auth, controller.createCampaign);
router.get('/:id', auth, controller.getCampaignById);
router.put('/:id', auth, controller.updateCampaign);

module.exports = router;
