import React from "react";
import { Typography, TextField, Box, Grid, MenuItem } from "@mui/material";

const PEGENSURVEY = ({ formData, setFormData }) => {
  const handleChange = (field) => (e) => {
    setFormData({
      ...formData,
      PEGENSURVEY: {
        ...formData.PEGENSURVEY,
        [field]: e.target.value,
      },
    });
  };

  return (
    <Box>
      <Typography variant="h6">Physical Examination General Survey</Typography>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <TextField
            label="General Survey ID"
            fullWidth
            value={formData.PEGENSURVEY?.pGenSurveyId || ""}
            onChange={handleChange("pGenSurveyId")}
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            label="General Survey Remarks"
            fullWidth
            value={formData.PEGENSURVEY?.pGenSurveyRem || ""}
            onChange={handleChange("pGenSurveyRem")}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            select
            label="Report Status"
            fullWidth
            value={formData.PEGENSURVEY?.pReportStatus || ""}
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
            value={formData.PEGENSURVEY?.pDeficiencyRemarks || ""}
            onChange={handleChange("pDeficiencyRemarks")}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PEGENSURVEY;
