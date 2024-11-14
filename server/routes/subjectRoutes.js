// server/routes/subjectRoutes.js
const express = require('express');
const router = express.Router();
const { getSubjects, addSubject } = require('../controllers/subjectController'); // Make sure this path is correct

router.get('/subjects', getSubjects);
router.post('/addSubject', addSubject);

module.exports = router;
