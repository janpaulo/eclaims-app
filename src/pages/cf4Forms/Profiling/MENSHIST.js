import React from "react";
import { Typography, TextField, Box, Grid, MenuItem } from "@mui/material";

const MENSHIST = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      MENSHIST: {
        ...formData.MENSHIST,
        [name]: value,
      },
    });
  };

  const fields = [
    { name: "pMenarchePeriod", label: "Menarche Period" },
    { name: "pLastMensPeriod", label: "Last Menstrual Period" },
    { name: "pPeriodDuration", label: "Period Duration (days)" },
    { name: "pMensInterval", label: "Menstrual Interval (days)" },
    { name: "pPadsPerDay", label: "Pads Used Per Day" },
    { name: "pOnsetSexIc", label: "Onset of Sexual Intercourse (age)" },
    { name: "pBirthCtrlMethod", label: "Birth Control Method" },
    { name: "pMenopauseAge", label: "Age of Menopause" },
    { name: "pDeficiencyRemarks", label: "Deficiency Remarks" },
  ];

  return (
    <Box>
      <Typography variant="h6">– Patient 
Menstrual History (For 
Female Patient Only)</Typography>
      <Grid container spacing={2}>
        {fields.map((field) => (
          <Grid item xs={12} sm={3} key={field.name}>
            <TextField
              fullWidth
              label={field.label}
              name={field.name}
              value={formData.MENSHIST?.[field.name] || ""}
              onChange={handleChange}
            />
          </Grid>
        ))}
        <Grid item xs={12} sm={3}>
          <TextField
            select
            fullWidth
            label="Is Applicable"
            name="pIsApplicable"
            value={formData.MENSHIST?.pIsApplicable || ""}
            onChange={handleChange}
          >
            <MenuItem value="Y">Yes</MenuItem>
            <MenuItem value="N">No</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            select
            fullWidth
            label="Report Status"
            name="pReportStatus"
            value={formData.MENSHIST?.pReportStatus || ""}
            onChange={handleChange}
          >
            <MenuItem value="U">Unverified</MenuItem>
            <MenuItem value="V">Verified</MenuItem>
            <MenuItem value="F">Final</MenuItem>
          </TextField>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MENSHIST;
