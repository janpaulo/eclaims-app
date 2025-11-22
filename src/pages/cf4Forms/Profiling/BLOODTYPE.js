import React from "react";
import { Typography, TextField, Box, Grid, MenuItem } from "@mui/material";

const BLOODTYPE = ({ formData, setFormData }) => {
  const handleChange = (field) => (e) => {
    setFormData({
      ...formData,
      BLOODTYPE: {
        ...formData.BLOODTYPE,
        [field]: e.target.value,
      },
    });
  };

  return (
    <Box>
      <Typography variant="h6"> Patient Blood type Details</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Blood Type"
            fullWidth
            value={formData.BLOODTYPE?.pBloodType || ""}
            onChange={handleChange("pBloodType")}
            placeholder="A, B, AB, O"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Rh Type"
            fullWidth
            value={formData.BLOODTYPE?.pBloodRh || ""}
            onChange={handleChange("pBloodRh")}
            placeholder="+ or -"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            select
            label="Report Status"
            fullWidth
            value={formData.BLOODTYPE?.pReportStatus || ""}
            onChange={handleChange("pReportStatus")}
          >
            <MenuItem value="U">Unverified</MenuItem>
            <MenuItem value="V">Verified</MenuItem>
            <MenuItem value="F">Final</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            label="Deficiency Remarks"
            fullWidth
            value={formData.BLOODTYPE?.pDeficiencyRemarks || ""}
            onChange={handleChange("pDeficiencyRemarks")}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default BLOODTYPE;
