const express = require('express');
const router = express.Router();
const controller = require('../controllers/taskController');
const auth = require('../middleware/auth');

router.get('/', auth, controller.getTasks);
router.post('/', auth, controller.createTask);
router.patch('/:id/move', auth, controller.moveTask);

module.exports = router;
