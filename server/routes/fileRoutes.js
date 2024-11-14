const express = require('express');
const router = express.Router();
const { createFile, getSubjects, addSubject } = require('../controllers/fileController');

// POST route to create a new file
router.post('/create', createFile);

// GET route to retrieve all subjects for a user
router.get('/subjects', getSubjects);

// POST route to add a new subject
router.post('/addSubject', addSubject);

module.exports = router;
