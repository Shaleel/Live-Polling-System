const express = require('express');
const router = express.Router();
const Poll = require('../controllers/poll');

router.get('/get-all', Poll.getAll);
module.exports = router;
