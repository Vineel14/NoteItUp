// server/controllers/subjectController.js
const { subjects } = require('../data/store'); // Adjust path if necessary

// Controller to fetch all subjects for a user
const getSubjects = (req, res) => {
  const { userId } = req.headers;

  if (!userId) {
    return res.status(400).json({ message: 'User ID required' });
  }

  const userSubjects = subjects[userId] || [];
  res.status(200).json({ subjects: userSubjects });
};

// Controller to add a new subject for a user
const addSubject = (req, res) => {
  const { subject } = req.body;
  const { userId } = req.headers;

  if (!userId || !subject) {
    return res.status(400).json({ message: 'User ID and subject name are required' });
  }

  if (!subjects[userId]) {
    subjects[userId] = [];
  }

  if (subjects[userId].includes(subject)) {
    return res.status(400).json({ message: 'Subject already exists' });
  }

  subjects[userId].push(subject);
  res.status(201).json({ message: 'Subject added successfully', subject });
};

module.exports = { getSubjects, addSubject };
