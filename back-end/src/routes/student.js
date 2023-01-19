const express = require('express');
const router = express.Router();
const Student = require('../controllers/student');

router.get('/get/:id', Student.getStudentById);
router.post('/create', Student.createStudent);
module.exports = router;
