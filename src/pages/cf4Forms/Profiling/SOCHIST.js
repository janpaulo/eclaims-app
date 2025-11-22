import React from "react";
import { Typography, TextField, Box, Grid, MenuItem } from "@mui/material";

const SOCHIST = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      SOCHIST: {
        ...formData.SOCHIST,
        [name]: value,
      },
    });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Patient Social/ Personal History
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <TextField
            select
            label="Is Smoker"
            name="pIsSmoker"
            value={formData.SOCHIST?.pIsSmoker || ""}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="No. of Cigarettes per Pack"
            name="pNoCigpk"
            value={formData.SOCHIST?.pNoCigpk || ""}
            onChange={handleChange}
            fullWidth
            type="number"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            select
            label="Is Alcohol Drinker"
            name="pIsAdrinker"
            value={formData.SOCHIST?.pIsAdrinker || ""}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="No. of Bottles"
            name="pNoBottles"
            value={formData.SOCHIST?.pNoBottles || ""}
            onChange={handleChange}
            fullWidth
            type="number"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            select
            label="Illegal Drug User"
            name="pIllDrugUser"
            value={formData.SOCHIST?.pIllDrugUser || ""}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            select
            label="Report Status"
            name="pReportStatus"
            value={formData.SOCHIST?.pReportStatus || ""}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="U">Unverified</MenuItem>
            <MenuItem value="V">Verified</MenuItem>
            <MenuItem value="F">Final</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Deficiency Remarks"
            name="pDeficiencyRemarks"
            value={formData.SOCHIST?.pDeficiencyRemarks || ""}
            onChange={handleChange}
            fullWidth
            multiline
            rows={2}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SOCHIST;
