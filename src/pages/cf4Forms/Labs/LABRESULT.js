import React from "react";
import { Grid, TextField, Typography } from "@mui/material";

const initialLabResult = {
  pHciCaseNo: "",
  pPatientPin: "",
  pPatientType: "",
  pMemPin: "",
  pEffYear: "",
};

export const LABRESULT = ({ labResultData, setLabResultData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLabResultData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Grid container spacing={2} sx={{ p: 2, border: "1px solid #ccc", borderRadius: 2, mb: 3 }}>
      <Grid item xs={12}>
        <Typography variant="h6">LABRESULT Information</Typography>
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          name="pHciCaseNo"
          label="HCI Case No"
          value={labResultData?.pHciCaseNo || ''} 
          onChange={handleChange}
          required
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          name="pPatientPin"
          label="Patient PIN"
          value={labResultData?.pPatientPin || ''}
          onChange={handleChange}
          required
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          name="pPatientType"
          label="Patient Type"
          value={labResultData?.pPatientType || ''}
          onChange={handleChange}
          required
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          name="pMemPin"
          label="Member PIN"
          value={labResultData?.pMemPin || ''}
          onChange={handleChange}
          required
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          name="pEffYear"
          label="Effectivity Year"
          value={labResultData?.pEffYear || ''}
          onChange={handleChange}
          required
        />
      </Grid>
    </Grid>
  );
};

export default LABRESULT;
