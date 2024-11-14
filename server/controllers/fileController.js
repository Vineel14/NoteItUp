const { v4: uuidv4 } = require('uuid');
const { files, subjects } = require('../data/store');

// Create a new file
const createFile = (req, res) => {
  const { fileName, userId, subject } = req.body;
  const fileId = uuidv4();

  if (!userId || !subject || !fileName) {
    return res.status(400).json({ message: 'User ID, subject, and file name are required' });
  }

  const newFile = {
    id: fileId,
    userId,
    subject,
    title: fileName,
    createdAt: new Date(),
    updatedAt: new Date(),
    pages: [],
  };

  files.push(newFile);
  res.status(201).json({ message: 'File created successfully', file: newFile });
};

// server/controllers/fileController.js
const getSubjects = (req, res) => {
  const userId = req.headers['userid']; // Use lowercase key to access userId

  if (!userId) {
    return res.status(400).json({ message: 'User ID required' });
  }

  const userSubjects = subjects[userId] || [];
  res.status(200).json({ subjects: userSubjects });
};



// Add a new subject for a user
const addSubject = (req, res) => {
  const { subject } = req.body;
  const userId = req.headers.userid; // Read userId from headers

  if (!userId || !subject) {
    return res.status(400).json({ message: 'User ID and subject name are required' });
  }

  if (!subjects[userId]) {
    subjects[userId] = []; // Initialize subjects array if it doesn’t exist
  }

  if (subjects[userId].includes(subject)) {
    return res.status(400).json({ message: 'Subject already exists' });
  }

  subjects[userId].push(subject);
  res.status(201).json({ message: 'Subject added successfully', subject });
};

module.exports = { createFile, getSubjects, addSubject };
