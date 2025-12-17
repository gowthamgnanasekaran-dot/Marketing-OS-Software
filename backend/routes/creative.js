const express = require('express');
const router = express.Router();
router.get('/', (req, res) => res.json({ msg: 'Creative endpoint' }));
module.exports = router;
