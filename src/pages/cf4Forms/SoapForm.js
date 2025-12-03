import React, { useState } from "react";
import { TextField, Box, Grid, Typography, Button } from "@mui/material";

export default function SoapForm() {

  const [formData, setFormData] = useState({
    effyear: "",
    hcicaseno: "",
    hcitransno: "",
    icds: [
      { icdcode: "" },
      { icdcode: "" }
    ],
    patientpin: "",
    patienttype: "",
    soapatc: "",
    soapdate: "",
    subjective: [
      { illnesshistory: "" }
    ]
  });

  const handleChange = (field, value) =>
    setFormData(prev => ({ ...prev, [field]: value }));

  const handleICDChange = (i, value) => {
    const updated = [...formData.icds];
    updated[i].icdcode = value;
    setFormData(prev => ({ ...prev, icds: updated }));
  };

  const handleSubmit = () => console.log("Submitted:", formData);

  return (
    <Box p={3}>
      <Typography variant="h6">SOAP Form</Typography>
      <Grid container spacing={2}>

        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            label="Effyear"
            value={formData.effyear}
            onChange={e => handleChange("effyear", e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="HCI Case No"
            value={formData.hcicaseno}
            onChange={e => handleChange("hcicaseno", e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="HCI Trans No"
            value={formData.hcitransno}
            onChange={e => handleChange("hcitransno", e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography sx={{ mt: 2 }}>ICD Codes (Fixed 2)</Typography>
        </Grid>

        {formData.icds.map((icd, index) => (
          <Grid item xs={12} md={4} key={index}>
            <TextField
              fullWidth
              label={`ICD Code ${index + 1}`}
              value={icd.icdcode}
              onChange={e => handleICDChange(index, e.target.value)}
            />
          </Grid>
        ))}

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Patient PIN"
            value={formData.patientpin}
            onChange={e => handleChange("patientpin", e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            label="Patient Type"
            value={formData.patienttype}
            onChange={e => handleChange("patienttype", e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            label="SOAP ATC"
            value={formData.soapatc}
            onChange={e => handleChange("soapatc", e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            type="date"
            label="SOAP Date"
            InputLabelProps={{ shrink: true }}
            value={formData.soapdate}
            onChange={e => handleChange("soapdate", e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            minRows={4}
            label="Illness History"
            value={formData.subjective[0].illnesshistory}
            onChange={e =>
              setFormData(prev => ({
                ...prev,
                subjective: [{ illnesshistory: e.target.value }]
              }))
            }
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>

      </Grid>
    </Box>
  );
}
