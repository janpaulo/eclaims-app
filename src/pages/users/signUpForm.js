import React, { Component } from 'react';
import { Box, Grid, TextField, Typography,
    //  Checkbox, 
     Button, 
    //  FormControlLabel, Link,
      Paper, Alert } from '@mui/material';
import { AccountCircle, Email, Lock, Key } from '@mui/icons-material';
import axios from 'axios';
// import ImageBG from '../../images/plant.jpg'

class signUpForm extends Component {
  constructor(props) {
    super(props);
    
    // Initialize state
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeTerms: false,
      error: '',
      success: '',
    };
  }

  // Handle input changes and update state
  handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    this.setState({
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle form submission
  handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email, password, confirmPassword, agreeTerms } = this.state;
    
    // Clear previous messages
    this.setState({ error: '', success: '' });

    // Basic form validation
    if (!name || !email || !password || !confirmPassword) {
      this.setState({ error: 'Please fill out all fields.' });
      return;
    }
    if (password !== confirmPassword) {
      this.setState({ error: 'Passwords do not match.' });
      return;
    }
    if (!agreeTerms) {
      this.setState({ error: 'You must agree to the terms of service.' });
      return;
    }

    // Prepare data to send
    const userData = {
      name,
      email,
      password,
    };

    try {
      // Send data to API via Axios
      const response = await axios.post('https://api.example.com/register', userData);

      if (response.data.success) {
        this.setState({ success: 'Registration successful!' });
      } else {
        this.setState({ error: 'Registration failed. Please try again.' });
      }
    } catch (error) {
      console.error(error);
      this.setState({ error: 'An error occurred. Please try again.' });
    }
  };

  render() {
    const { name, email, password, confirmPassword, error, success } = this.state;

    return (
      <Box
        sx={{
        //   minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        //   backgroundColor: '#f5f5f5',
        }}
      >
        <Paper
          elevation={0}
          sx={{
            padding: 4,
            width: '100%',
            maxWidth: '900px',
            borderRadius: 3,
          }}
        >
          <form onSubmit={this.handleSubmit}>
            <Grid container spacing={2}>
              {/* Left Column - Form */}
              <Grid item xs={12} md={3}>
                </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
                  Sign up
                </Typography>

                {/* Error or Success Messages */}
                {error && <Alert severity="error">{error}</Alert>}
                {success && <Alert severity="success">{success}</Alert>}

                {/* Name Field */}
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  label="Your Name"
                  name="name"
                  value={name}
                  onChange={this.handleInputChange}
                  InputProps={{
                    startAdornment: <AccountCircle sx={{ mr: 1 }} />,
                  }}
                />

                {/* Email Field */}
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  label="Your Email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={this.handleInputChange}
                  InputProps={{
                    startAdornment: <Email sx={{ mr: 1 }} />,
                  }}
                />

                {/* Password Field */}
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  label="Password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.handleInputChange}
                  InputProps={{
                    startAdornment: <Lock sx={{ mr: 1 }} />,
                  }}
                />

                {/* Repeat Password Field */}
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  label="Repeat your password"
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={this.handleInputChange}
                  InputProps={{
                    startAdornment: <Key sx={{ mr: 1 }} />,
                  }}
                />

                {/* Register Button */}
                <Button variant="contained" color="primary" fullWidth sx={{ mt: 2, padding: 1.5 }} type="submit">
                  REGISTER
                </Button>
              </Grid>

              {/* Right Column - Illustration */}
              <Grid item xs={12} md={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {/* <Box
                  component="img"
                  src={ImageBG} // Replace this with the actual image URL or import it locally
                  alt="Sign up illustration"
                  sx={{ maxWidth: '100%', height: 'auto' }}
                /> */}
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    );
  }
}

export default signUpForm;
