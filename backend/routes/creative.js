const express = require('express');
const router = express.Router();
const controller = require('../controllers/creativeController');
const auth = require('../middleware/auth');

router.get('/', auth, controller.getAssets);
router.post('/', auth, controller.createAsset);
router.put('/:id', auth, controller.updateAsset);
router.delete('/:id', auth, controller.deleteAsset);

module.exports = router;
