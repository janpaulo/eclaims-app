import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  TextField,
  Paper,
  Button,
  Snackbar,
  Alert
} from '@mui/material';
import axios from 'axios';

const initialData = {
  hospitalCode: "300806",
  isForOPDHemodialysisClaim: "N",
  memberPIN: "190270634013",
  memberBasicInformation: {
    lastname: "EVRSFT LN ELEVEN",
    firstname: "EVRSFT FN ELEVEN",
    middlename: "EVRSFT MN ELEVEN",
    maidenname: "",
    suffix: "",
    sex: "M",
    dateOfBirth: "01-12-1974"
  },
  patientIs: "M",
  admissionDate: "08-15-2024",
  patientPIN: "190270634013",
  patientBasicInformation: {
    lastname: "EVRSFT LN ELEVEN",
    firstname: "EVRSFT FN ELEVEN",
    middlename: "EVRSFT MN ELEVEN",
    maidenname: "",
    suffix: "",
    sex: "M",
    dateOfBirth: "01-12-1974"
  },
  membershipType: "S",
  pEN: "",
  employerName: "",
  isFinal: "1"
};

const ClaimFormValidation = () => {
  const [formData, setFormData] = useState(initialData);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleChange = (path, value) => {
    const keys = path.split('.');
    setFormData(prev => {
      const updated = { ...prev };
      let nested = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        nested = nested[keys[i]];
      }
      nested[keys[keys.length - 1]] = value;
      return { ...updated };
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/isClaimsEligible', formData);
      setSnackbar({ open: true, message: 'Submitted successfully!', severity: 'success' });
      console.log('Response:', response.data);
    } catch (error) {
      setSnackbar({ open: true, message: 'Submission failed. Please try again.', severity: 'error' });
      console.error('Error:', error);
    }
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h6" gutterBottom>
        Claim Form
      </Typography>

      <Box mb={3}>
        <Typography variant="subtitle1">General Info</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Hospital Code"
              value={formData.hospitalCode}
              onChange={e => handleChange('hospitalCode', e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="For OPD Hemodialysis Claim"
              value={formData.isForOPDHemodialysisClaim}
              onChange={e => handleChange('isForOPDHemodialysisClaim', e.target.value)}
            />
          </Grid>
        </Grid>
      </Box>

      <Box mb={3}>
        <Typography variant="subtitle1">Member Information</Typography>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Member PIN"
              value={formData.memberPIN}
              onChange={e => handleChange('memberPIN', e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Last Name"
              value={formData.memberBasicInformation.lastname}
              onChange={e => handleChange('memberBasicInformation.lastname', e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="First Name"
              value={formData.memberBasicInformation.firstname}
              onChange={e => handleChange('memberBasicInformation.firstname', e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Middle Name"
              value={formData.memberBasicInformation.middlename}
              onChange={e => handleChange('memberBasicInformation.middlename', e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Maiden Name"
              value={formData.memberBasicInformation.maidenname}
              onChange={e => handleChange('memberBasicInformation.maidenname', e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              fullWidth
              label="Suffix"
              value={formData.memberBasicInformation.suffix}
              onChange={e => handleChange('memberBasicInformation.suffix', e.target.value)}
            />
          </Grid>
          <Grid item xs={1}>
            <TextField
              fullWidth
              label="Sex"
              value={formData.memberBasicInformation.sex}
              onChange={e => handleChange('memberBasicInformation.sex', e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Birth Date"
              value={formData.memberBasicInformation.dateOfBirth}
              onChange={e => handleChange('memberBasicInformation.dateOfBirth', e.target.value)}
            />
          </Grid>
        </Grid>
      </Box>

      <Box mb={3}>
        <Typography variant="subtitle1">Patient Information</Typography>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Patient Is"
              value={formData.patientIs}
              onChange={e => handleChange('patientIs', e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Patient PIN"
              value={formData.patientPIN}
              onChange={e => handleChange('patientPIN', e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Admission Date"
              value={formData.admissionDate}
              onChange={e => handleChange('admissionDate', e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Last Name"
              value={formData.patientBasicInformation.lastname}
              onChange={e => handleChange('patientBasicInformation.lastname', e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="First Name"
              value={formData.patientBasicInformation.firstname}
              onChange={e => handleChange('patientBasicInformation.firstname', e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Middle Name"
              value={formData.patientBasicInformation.middlename}
              onChange={e => handleChange('patientBasicInformation.middlename', e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Maiden Name"
              value={formData.patientBasicInformation.maidenname}
              onChange={e => handleChange('patientBasicInformation.maidenname', e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              fullWidth
              label="Suffix"
              value={formData.patientBasicInformation.suffix}
              onChange={e => handleChange('patientBasicInformation.suffix', e.target.value)}
            />
          </Grid>
          <Grid item xs={1}>
            <TextField
              fullWidth
              label="Sex"
              value={formData.patientBasicInformation.sex}
              onChange={e => handleChange('patientBasicInformation.sex', e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Birth Date"
              value={formData.patientBasicInformation.dateOfBirth}
              onChange={e => handleChange('patientBasicInformation.dateOfBirth', e.target.value)}
            />
          </Grid>
        </Grid>
      </Box>

      <Box mb={3}>
        <Typography variant="subtitle1">Other Info</Typography>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Membership Type"
              value={formData.membershipType}
              onChange={e => handleChange('membershipType', e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="PEN"
              value={formData.pEN}
              onChange={e => handleChange('pEN', e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Employer Name"
              value={formData.employerName}
              onChange={e => handleChange('employerName', e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              fullWidth
              label="Final"
              value={formData.isFinal}
              onChange={e => handleChange('isFinal', e.target.value)}
            />
          </Grid>
        </Grid>
      </Box>

      <Box mt={4}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default ClaimFormValidation;
