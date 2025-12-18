const express = require('express');
const router = express.Router();
const controller = require('../controllers/reportsController');
const auth = require('../middleware/auth');

router.get('/', auth, controller.getReports);
router.post('/', auth, controller.createReport);
router.get('/:id', auth, controller.getReportById);
router.delete('/:id', auth, controller.deleteReport);

module.exports = router;
