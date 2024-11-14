import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserId } from '../store/userSlice';
import { 
  Box, 
  Tab, 
  Tabs, 
  TextField, 
  Typography, 
  Button, 
  IconButton, 
  Checkbox, 
  FormControlLabel 
} from '@mui/material';
import { Facebook, Google, Twitter, GitHub } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // Success message state

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
    setError('');
    setSuccess(''); // Clear any success message when switching tabs
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/auth/login', loginData);
      const userId = response.data.user.id;
      dispatch(setUserId(userId));
      navigate("/home"); // Redirect to home after successful login
    } catch (err) {
      setError(err.response?.data.message || 'Login failed');
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/auth/register', registerData);
      setSuccess('Registration successful! Please log in.'); // Show success message
      setTab(0); // Switch to the login tab
    } catch (err) {
      setError(err.response?.data.message || 'Registration failed');
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
      {/* App Name */}
      <Typography 
        variant="h3" 
        component="h1" 
        color="primary" 
        sx={{ fontFamily: 'Roboto', fontWeight: 'bold', mb: 2 }}
      >
        NoteItUp
      </Typography>

      {/* Success message display */}
      {success && <Typography color="primary" mt={2}>{success}</Typography>}

      <Tabs value={tab} onChange={handleTabChange} centered>
        <Tab label="Login" />
        <Tab label="Register" />
      </Tabs>

      <Box display="flex" justifyContent="center" mt={3} gap={2}>
        <IconButton color="primary"><Facebook /></IconButton>
        <IconButton color="primary"><Google /></IconButton>
        <IconButton color="primary"><Twitter /></IconButton>
        <IconButton color="primary"><GitHub /></IconButton>
      </Box>

      <Typography variant="body1" align="center" mt={2}>or</Typography>
      {error && <Typography color="error" mt={2}>{error}</Typography>}

      {tab === 0 && (
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 2, width: '100%', maxWidth: 400 }}>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            required
            value={loginData.email}
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            required
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
          />
          <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
            <FormControlLabel control={<Checkbox />} label="Remember me" />
            <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }}>
              Forgot password?
            </Typography>
          </Box>
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
            Sign In
          </Button>
          <Typography align="center" variant="body2" mt={2}>
            Not a member? <span style={{ color: '#1976d2', cursor: 'pointer' }}>Register</span>
          </Typography>
        </Box>
      )}

      {tab === 1 && (
        <Box component="form" onSubmit={handleRegister} sx={{ mt: 2, width: '100%', maxWidth: 400 }}>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            required
            value={registerData.name}
            onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
          />
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            required
            value={registerData.username}
            onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            required
            value={registerData.email}
            onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            required
            value={registerData.password}
            onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
          />
          <FormControlLabel
            control={<Checkbox required />}
            label="I have read and agree to the terms"
            sx={{ mt: 2 }}
          />
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
            Sign Up
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default AuthPage;
