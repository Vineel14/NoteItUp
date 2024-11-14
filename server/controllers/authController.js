// server/controllers/authController.js

const { v4: uuidv4 } = require('uuid');
const { users } = require('../data/store');

// Register a new user
const register = (req, res) => {
  const { name, username, email, password } = req.body;

  const userExists = users.some(user => user.email === email || user.username === username);
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const userId = uuidv4();
  const newUser = { id: userId, name, username, email, password, files: [] };
  users.push(newUser);

  res.status(201).json({ message: 'User registered successfully', user: { id: userId, name, username, email } });
};

// Login an existing user
const login = (req, res) => {
  const { email, password } = req.body;

  const user = users.find(user => user.email === email && user.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Respond with only necessary information
  res.status(200).json({
    message: 'Login successful',
    user: {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email
    }
  });
};

module.exports = { register, login };
