const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const authRoutes = require('./routes/auth');
const fileRoutes = require('./routes/fileRoutes'); // Import file routes
const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:3000', // Local development
    'https://noteitup-v1.netlify.app' // Netlify deployment
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'userId']
}));

// Handle Preflight `OPTIONS` Requests
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Allow your frontend origin
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, userId');
  res.sendStatus(200);
});

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
