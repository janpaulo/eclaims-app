import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Paper,
  Button,
  Snackbar,
  Alert,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  FormControl,
} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";
import moment from "moment";

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
    dateOfBirth: moment(new Date("01-12-1974")).format("YYYY-MM-DD"), //"11-18-1953", "01-12-1974",
  },
  patientIs: "M",
  admissionDate: moment(new Date("08-15-2024")).format("YYYY-MM-DD"), // "08-15-2024",
  patientPIN: "190270634013",
  patientBasicInformation: {
    lastname: "EVRSFT LN ELEVEN",
    firstname: "EVRSFT FN ELEVEN",
    middlename: "EVRSFT MN ELEVEN",
    maidenname: "",
    suffix: "",
    sex: "M",
    dateOfBirth: moment(new Date("01-12-1974")).format("YYYY-MM-DD"), //"11-18-1953", "01-12-1974",
  },
  membershipType: "S",
  pEN: "",
  employerName: "",
  isFinal: "1",
};

const ClaimFormValidation = ({ setIsPbef, setPbefData ,authUser,setPbefResultData}) => {
  const [formData, setFormData] = useState(initialData);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (path, value) => {
    const keys = path.split(".");
    setFormData((prev) => {
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
      setLoading(true)
      const formatDate = (date) =>
        date ? moment(date).format("MM-DD-YYYY") : "";

      const formattedForm = {
        ...formData,
        memberBasicInformation: {
          ...formData.memberBasicInformation,
          dateOfBirth: formatDate(formData.memberBasicInformation?.dateOfBirth),
        },
        patientBasicInformation: {
          ...formData.patientBasicInformation,
          dateOfBirth: formatDate(
            formData.patientBasicInformation?.dateOfBirth
          ),
        },
        admissionDate: formatDate(formData.admissionDate),
      };

      
      const response = await axios.post(
        `${process.env.REACT_APP_NEW_PHIC_URL}/api/isClaimEligible`,
        formattedForm,
        {
          headers: {
            accreno: authUser.hospital.accreditation_num,
            softwarecertid: authUser.hospital.software_cert,
            cipherkey: authUser.hospital.cypher_key,
            "Content-Type": "text/plain",
          },
        }
      );

      setSnackbar({
        open: true,
        message:
          "Member is eligible reference no." +
          response.data.result.referenceno,
        severity: "success",
      });
      
      setLoading(false)
      setIsPbef(response.data.result.isok === "YES");
      setPbefResultData(response.data.result)
      setPbefData(formData);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Submission failed. Please try again.";
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: "error",
      });
      setLoading(false)
      console.error("Error:", error);
    }
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Box mb={3}>
        <Typography variant="subtitle1">General Info</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Hospital Code"
              value={formData.hospitalCode}
              onChange={(e) => handleChange("hospitalCode", e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl component="fieldset" fullWidth>
              <FormLabel component="legend">
                For OPD Hemodialysis Claim
              </FormLabel>
              <RadioGroup
                row
                name="isForOPDHemodialysisClaim"
                value={formData.isForOPDHemodialysisClaim}
                onChange={(e) =>
                  handleChange("isForOPDHemodialysisClaim", e.target.value)
                }
              >
                <FormControlLabel value="Y" control={<Radio />} label="Yes" />
                <FormControlLabel value="N" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      <Box mb={3}>
        <Typography variant="subtitle1">Member Information</Typography>
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <TextField
              fullWidth
              label="Member PIN"
              value={formData.memberPIN}
              onChange={(e) => handleChange("memberPIN", e.target.value)}
            />
          </Grid>
          <Grid item xs={5}></Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Last Name"
              value={formData.memberBasicInformation.lastname}
              onChange={(e) =>
                handleChange("memberBasicInformation.lastname", e.target.value)
              }
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="First Name"
              value={formData.memberBasicInformation.firstname}
              onChange={(e) =>
                handleChange("memberBasicInformation.firstname", e.target.value)
              }
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Middle Name"
              value={formData.memberBasicInformation.middlename}
              onChange={(e) =>
                handleChange(
                  "memberBasicInformation.middlename",
                  e.target.value
                )
              }
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Maiden Name"
              value={formData.memberBasicInformation.maidenname}
              onChange={(e) =>
                handleChange(
                  "memberBasicInformation.maidenname",
                  e.target.value
                )
              }
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              fullWidth
              label="Suffix"
              value={formData.memberBasicInformation.suffix}
              onChange={(e) =>
                handleChange("memberBasicInformation.suffix", e.target.value)
              }
            />
          </Grid>
          <Grid item xs={3}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Sex</FormLabel>
              <RadioGroup
                row
                name="patientBasicInformation.sex"
                value={formData.memberBasicInformation.sex}
                onChange={(e) =>
                  handleChange("memberBasicInformation.sex", e.target.value)
                }
              >
                <FormControlLabel value="M" control={<Radio />} label="Male" />
                <FormControlLabel
                  value="F"
                  control={<Radio />}
                  label="Female"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              type="date"
              label="Birth Date"
              value={formData.memberBasicInformation.dateOfBirth}
              onChange={(e) =>
                handleChange(
                  "memberBasicInformation.dateOfBirth",
                  e.target.value
                )
              }
            />
          </Grid>
        </Grid>
      </Box>

      <Box mb={3}>
        <Typography variant="subtitle1">Patient Information</Typography>
        <Grid container spacing={2}>

        <Grid item xs={4}>
            <FormControl component="fieldset" fullWidth>
              <FormLabel component="legend">
                  Patient
              </FormLabel>
              <RadioGroup
                row
                name="patientIs"
                value={formData.patientIs}
                onChange={(e) => handleChange("patientIs", e.target.value)}
              >
                <FormControlLabel value="M" control={<Radio />} label="Member" />
                <FormControlLabel value="D" control={<Radio />} label="Dependent" />
              </RadioGroup>
            </FormControl>
          </Grid>
          {/* <Grid item xs={4}>
            <TextField
              fullWidth
              label="Patient Is"
              value={formData.patientIs}
              onChange={(e) => handleChange("patientIs", e.target.value)}
            />
          </Grid> */}
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Patient PIN"
              value={formData.patientPIN}
              onChange={(e) => handleChange("patientPIN", e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              type="date"
              label="Admission Date"
              value={formData.admissionDate}
              onChange={(e) => handleChange("admissionDate", e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Last Name"
              value={formData.patientBasicInformation.lastname}
              onChange={(e) =>
                handleChange("patientBasicInformation.lastname", e.target.value)
              }
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="First Name"
              value={formData.patientBasicInformation.firstname}
              onChange={(e) =>
                handleChange(
                  "patientBasicInformation.firstname",
                  e.target.value
                )
              }
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Middle Name"
              value={formData.patientBasicInformation.middlename}
              onChange={(e) =>
                handleChange(
                  "patientBasicInformation.middlename",
                  e.target.value
                )
              }
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Maiden Name"
              value={formData.patientBasicInformation.maidenname}
              onChange={(e) =>
                handleChange(
                  "patientBasicInformation.maidenname",
                  e.target.value
                )
              }
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              fullWidth
              label="Suffix"
              value={formData.patientBasicInformation.suffix}
              onChange={(e) =>
                handleChange("patientBasicInformation.suffix", e.target.value)
              }
            />
          </Grid>
          <Grid item xs={3}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Sex</FormLabel>
              <RadioGroup
                row
                name="patientBasicInformation.sex"
                value={formData.patientBasicInformation.sex}
                onChange={(e) =>
                  handleChange("patientBasicInformation.sex", e.target.value)
                }
              >
                <FormControlLabel value="M" control={<Radio />} label="Male" />
                <FormControlLabel
                  value="F"
                  control={<Radio />}
                  label="Female"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              type="date"
              label="Birth Date"
              value={formData.patientBasicInformation.dateOfBirth}
              onChange={(e) =>
                handleChange(
                  "patientBasicInformation.dateOfBirth",
                  e.target.value
                )
              }
            />
          </Grid>
        </Grid>
      </Box>

      <Box mb={3}>
        {/* <Typography variant="subtitle1">Other Info</Typography> */}
        <Grid container spacing={2}>
          <Grid item xs={4}>

          <FormControl component="fieldset">
              <FormLabel component="legend">Membership Type</FormLabel>
              <RadioGroup
                row
                name="membershipType"
                value={formData.membershipType}
                onChange={(e) =>
                  handleChange("membershipType", e.target.value)
                }
              >
                <FormControlLabel value="S" control={<Radio />} label="Self Employed" />
                <FormControlLabel
                  value="E"
                  control={<Radio />}
                  label="Employed"
                />
              </RadioGroup>
            </FormControl>
            {/* <TextField
              fullWidth
              label="Membership Type"
              value={formData.membershipType}
              onChange={(e) => handleChange("membershipType", e.target.value)}
            /> */}
          </Grid>
          <Grid item xs={4}>
            <TextField
              sx={{ display: "none" }}
              fullWidth
              label="PEN"
              value={formData.pEN}
              onChange={(e) => handleChange("pEN", e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              sx={{ display: "none" }}
              fullWidth
              label="Employer Name"
              value={formData.employerName}
              onChange={(e) => handleChange("employerName", e.target.value)}
            />
          </Grid>
          {/* <Grid item xs={2}> */}
            <TextField
              fullWidth
              sx={{ display: "none" }}
              label="Final"
              value={formData.isFinal}
              onChange={(e) => handleChange("isFinal", e.target.value)}
            />
          {/* </Grid> */}
        </Grid>
      </Box>

      <Box mt={4}>
        <Button variant="contained" color="primary" onClick={handleSubmit} 
        endIcon={loading? <CircularProgress color="inherit" size="30px"/>:<SendIcon />}
        disabled={loading}
        >
          Submit 
        </Button>

      </Box>

      
 
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default ClaimFormValidation;
