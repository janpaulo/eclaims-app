import React from "react";
import { Box, Grid, TextField, Typography,MenuItem } from "@mui/material";

const ADVICE = ({ formData, setFormData }) => {
  const advice = formData.ADVICE || {
    pRemarks: "",
    pReportStatus: "",
    pDeficiencyRemarks: "",
  };

  const handleChange = (field, value) => {
    const updatedAdvice = { ...advice, [field]: value };
    setFormData({ ...formData, ADVICE: updatedAdvice });
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        ADVICE
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={10}>
          <TextField
            fullWidth
            label="Remarks"
            value={advice.pRemarks}
            onChange={(e) => handleChange("pRemarks", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            select
            label="Report Status"
            fullWidth
            value={advice.pReportStatus}
            onChange={(e) => handleChange("pReportStatus", e.target.value)}
          >
            <MenuItem value="U">Unverified</MenuItem>
            <MenuItem value="V">Verified</MenuItem>
            <MenuItem value="F">Final</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            fullWidth
            label="Deficiency Remarks"
            value={advice.pDeficiencyRemarks}
            onChange={(e) => handleChange("pDeficiencyRemarks", e.target.value)}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ADVICE;
