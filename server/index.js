const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const authRoutes = require('./routes/auth');
const fileRoutes = require('./routes/fileRoutes'); // Import file routes

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/file', fileRoutes); // Add file routes

app.get('/', (req, res) => {
  res.send('Welcome to the NoteItUp API');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
