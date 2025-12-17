const express = require('express');
const router = express.Router();
const controller = require('../controllers/socialController');
const auth = require('../middleware/auth');

router.get('/', auth, controller.getPosts);
router.post('/', auth, controller.createPost);
router.patch('/:id/approve', auth, controller.approvePost);
router.delete('/:id', auth, controller.deletePost);

module.exports = router;
