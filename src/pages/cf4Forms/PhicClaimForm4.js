import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Button,
} from "@mui/material";

const symptomOptions = [
  "Altered mental sensorium", "Diarrhea", "Hematemesis", "Palpitations",
  "Abdominal cramp/pain", "Dizziness", "Hematuria", "Seizures",
  "Anorexia", "Dysphagia", "Hemoptysis", "Skin rashes",
  "Bleeding gums", "Dyspnea", "Irritability", "Stool, bloody/black tarry/mucoid",
  "Body weakness", "Dysuria", "Jaundice", "Sweating",
  "Blurring of vision", "Epistaxis", "Lower extremity edema", "Urgency",
  "Chest pain/discomfort", "Fever", "Myalgia", "Vomiting",
  "Constipation", "Frequency of urination", "Orthopnea", "Weight loss",
  "Cough", "Headache", "Pain (site)", "Others",
];

const PhicClaimForm4 = () => {
  const [formData, setFormData] = useState({
    // Section I
    hciName: "",
    hciAccreditation: "",
    hciAddress: "",

    // Section II
    lastName: "", firstName: "", middleName: "",
    pin: "", age: "", male: false, female: false,
    chiefComplaint: "", admitDiagnosis: "", dischargeDiagnosis: "",
    caseRate1: "", caseRate2: "",
    dateAdmitted: "", timeAdmitted: "",
    dateDischarged: "", timeDischarged: "",

    // Section III
    presentIllness: "",
    pastHistory: "",
    obHistory: "",
    referred: false,
    originatingHci: "",
    height: "", weight: "", bp: "", hr: "", rr: "", temp: "",
    physicalFindings: "",
    symptoms: {},

    // Section IV
    wardCourse: "",
    surgicalProcedure: "",

    // Section V
    drugName: "", dosage: "", drugCost: "",

    // Section VI
    improved: false, recovered: false, hamndama: false,
    expired: false, absconded: false, transferred: false,
    transferReason: "",

    // Section VII
    signature: "",
    dateSigned: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSymptomChange = (label) => {
    setFormData((prev) => ({
      ...prev,
      symptoms: {
        ...prev.symptoms,
        [label]: !prev.symptoms[label],
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // You can replace this with API submission or PDF generation
  };

  return (
    <Box p={4} component="form" onSubmit={handleSubmit}>
      <Typography variant="h4" gutterBottom>
        PhilHealth Claim Form 4 (CF4)
      </Typography>

      {/* I. Health Care Institution */}
      <Typography variant="h6" gutterBottom>I. Health Care Institution Information</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField label="Name of HCI" name="hciName" value={formData.hciName} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField label="Accreditation Number" name="hciAccreditation" value={formData.hciAccreditation} onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Address" name="hciAddress" value={formData.hciAddress} onChange={handleChange} fullWidth />
        </Grid>
      </Grid>

      {/* II. Patient's Data */}
      <Box mt={4}>
        <Typography variant="h6">II. Patient’s Data</Typography>
        <Grid container spacing={2}>
          <Grid item xs={4}><TextField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} fullWidth /></Grid>
          <Grid item xs={4}><TextField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} fullWidth /></Grid>
          <Grid item xs={4}><TextField label="Middle Name" name="middleName" value={formData.middleName} onChange={handleChange} fullWidth /></Grid>
          <Grid item xs={6}><TextField label="PIN" name="pin" value={formData.pin} onChange={handleChange} fullWidth /></Grid>
          <Grid item xs={3}><TextField label="Age" name="age" value={formData.age} onChange={handleChange} fullWidth /></Grid>
          <Grid item xs={3}>
            <FormGroup row>
              <FormControlLabel control={<Checkbox checked={formData.male} onChange={handleChange} name="male" />} label="Male" />
              <FormControlLabel control={<Checkbox checked={formData.female} onChange={handleChange} name="female" />} label="Female" />
            </FormGroup>
          </Grid>
          <Grid item xs={12}><TextField label="Chief Complaint" name="chiefComplaint" value={formData.chiefComplaint} onChange={handleChange} fullWidth /></Grid>
          <Grid item xs={6}><TextField label="Admitting Diagnosis" name="admitDiagnosis" value={formData.admitDiagnosis} onChange={handleChange} fullWidth /></Grid>
          <Grid item xs={6}><TextField label="Discharge Diagnosis" name="dischargeDiagnosis" value={formData.dischargeDiagnosis} onChange={handleChange} fullWidth /></Grid>
          <Grid item xs={6}><TextField label="1st Case Rate Code" name="caseRate1" value={formData.caseRate1} onChange={handleChange} fullWidth /></Grid>
          <Grid item xs={6}><TextField label="2nd Case Rate Code" name="caseRate2" value={formData.caseRate2} onChange={handleChange} fullWidth /></Grid>
          <Grid item xs={6}><TextField label="Date Admitted" type="date" name="dateAdmitted" value={formData.dateAdmitted} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} /></Grid>
          <Grid item xs={6}><TextField label="Time Admitted" type="time" name="timeAdmitted" value={formData.timeAdmitted} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} /></Grid>
          <Grid item xs={6}><TextField label="Date Discharged" type="date" name="dateDischarged" value={formData.dateDischarged} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} /></Grid>
          <Grid item xs={6}><TextField label="Time Discharged" type="time" name="timeDischarged" value={formData.timeDischarged} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} /></Grid>
        </Grid>
      </Box>

      {/* III. Reason for Admission */}
      <Box mt={4}>
        <Typography variant="h6">III. Reason for Admission</Typography>
        <TextField label="History of Present Illness" name="presentIllness" value={formData.presentIllness} onChange={handleChange} fullWidth multiline rows={2} margin="normal" />
        <TextField label="Pertinent Past Medical History" name="pastHistory" value={formData.pastHistory} onChange={handleChange} fullWidth multiline rows={2} margin="normal" />
        <TextField label="OB/GYN History" name="obHistory" value={formData.obHistory} onChange={handleChange} fullWidth margin="normal" />
        <Typography variant="subtitle1">Pertinent Signs and Symptoms:</Typography>
        <FormGroup row>
          {symptomOptions.map((symptom) => (
            <FormControlLabel
              key={symptom}
              control={<Checkbox checked={formData.symptoms[symptom] || false} onChange={() => handleSymptomChange(symptom)} />}
              label={symptom}
            />
          ))}
        </FormGroup>
        <FormGroup row sx={{ mt: 2 }}>
          <FormControlLabel control={<Checkbox checked={formData.referred} onChange={handleChange} name="referred" />} label="Referred from another HCI" />
          <TextField label="Originating HCI" name="originatingHci" value={formData.originatingHci} onChange={handleChange} sx={{ ml: 2, width: 300 }} />
        </FormGroup>
        <Grid container spacing={2}>
          <Grid item xs={6}><TextField label="Height (cm)" name="height" value={formData.height} onChange={handleChange} fullWidth /></Grid>
          <Grid item xs={6}><TextField label="Weight (kg)" name="weight" value={formData.weight} onChange={handleChange} fullWidth /></Grid>
          <Grid item xs={3}><TextField label="BP" name="bp" value={formData.bp} onChange={handleChange} fullWidth /></Grid>
          <Grid item xs={3}><TextField label="HR" name="hr" value={formData.hr} onChange={handleChange} fullWidth /></Grid>
          <Grid item xs={3}><TextField label="RR" name="rr" value={formData.rr} onChange={handleChange} fullWidth /></Grid>
          <Grid item xs={3}><TextField label="Temp" name="temp" value={formData.temp} onChange={handleChange} fullWidth /></Grid>
          <Grid item xs={12}><TextField label="Physical Findings" name="physicalFindings" value={formData.physicalFindings} onChange={handleChange} fullWidth multiline rows={2} /></Grid>
        </Grid>
      </Box>

      {/* IV. Course in the Ward */}
      <Box mt={4}>
        <Typography variant="h6">IV. Course in the Ward</Typography>
        <TextField label="Doctor's Orders / Action" name="wardCourse" value={formData.wardCourse} onChange={handleChange} fullWidth multiline rows={3} margin="normal" />
        <TextField label="Surgical Procedure / RVS Code" name="surgicalProcedure" value={formData.surgicalProcedure} onChange={handleChange} fullWidth />
      </Box>

      {/* V. Drugs / Medicines */}
      <Box mt={4}>
        <Typography variant="h6">V. Drugs / Medicines</Typography>
        <Grid container spacing={2}>
          <Grid item xs={4}><TextField label="Generic Name" name="drugName" value={formData.drugName} onChange={handleChange} fullWidth /></Grid>
          <Grid item xs={4}><TextField label="Dosage / Route / Frequency" name="dosage" value={formData.dosage} onChange={handleChange} fullWidth /></Grid>
          <Grid item xs={4}><TextField label="Total Cost" name="drugCost" value={formData.drugCost} onChange={handleChange} fullWidth /></Grid>
        </Grid>
      </Box>

      {/* VI. Outcome of Treatment */}
      <Box mt={4}>
        <Typography variant="h6">VI. Outcome of Treatment</Typography>
        <FormGroup row>
          {["improved", "recovered", "hamndama", "expired", "absconded", "transferred"].map((key) => (
            <FormControlLabel key={key} control={<Checkbox checked={formData[key]} onChange={handleChange} name={key} />} label={key.charAt(0).toUpperCase() + key.slice(1)} />
          ))}
          <TextField label="Reason for Transfer" name="transferReason" value={formData.transferReason} onChange={handleChange} sx={{ ml: 2, width: 300 }} />
        </FormGroup>
      </Box>

      {/* VII. Certification */}
      <Box mt={4}>
        <Typography variant="h6">VII. Certification of Health Care Professional</Typography>
        <TextField label="Signature over Printed Name" name="signature" value={formData.signature} onChange={handleChange} fullWidth />
        <TextField label="Date Signed" name="dateSigned" type="date" value={formData.dateSigned} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} sx={{ mt: 2 }} />
      </Box>

      {/* Submit */}
      <Box mt={4} textAlign="right">
        <Button type="submit" variant="contained" color="primary">Submit Form</Button>
      </Box>
    </Box>
  );
};

export default PhicClaimForm4;
