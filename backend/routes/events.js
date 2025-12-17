const express = require('express');
const router = express.Router();
const controller = require('../controllers/eventsController');
const auth = require('../middleware/auth');

router.get('/', auth, controller.getEvents);
router.post('/', auth, controller.createEvent);
router.put('/:id', auth, controller.updateEvent);
router.delete('/:id', auth, controller.deleteEvent);

module.exports = router;
