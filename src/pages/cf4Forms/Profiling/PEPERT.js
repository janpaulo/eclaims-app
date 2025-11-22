import React from "react";
import {
  Typography,
  TextField,
  Box,
  Grid,
  MenuItem,
} from "@mui/material";

const PEPERT = ({ formData, setFormData }) => {
  const handleChange = (field) => (e) => {
    setFormData({
      ...formData,
      PEPERT: {
        ...formData.PEPERT,
        [field]: e.target.value,
      },
    });
  };

  const fields = [
    { name: "pSystolic", label: "Systolic" },
    { name: "pDiastolic", label: "Diastolic" },
    { name: "pHr", label: "Heart Rate" },
    { name: "pRr", label: "Respiratory Rate" },
    { name: "pTemp", label: "Temperature (°C)" },
    { name: "pHeight", label: "Height (cm)" },
    { name: "pWeight", label: "Weight (kg)" },
    { name: "pVision", label: "Vision" },
    { name: "pLength", label: "Length (cm)" },
    { name: "pHeadCirc", label: "Head Circumference (cm)" },
    { name: "pReportStatus", label: "Report Status", type: "select" },
    { name: "pDeficiencyRemarks", label: "Deficiency Remarks" },
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        PEPERT (Physical Examination Parameters)
      </Typography>
      <Grid container spacing={2}>
        {fields.map((field) => (
          <Grid item xs={12} sm={3} key={field.name}>
            {field.type === "select" ? (
              <TextField
                select
                label={field.label}
                fullWidth
                value={formData.PEPERT?.[field.name] || ""}
                onChange={handleChange(field.name)}
              >
                <MenuItem value="U">Unvalidated</MenuItem>
                <MenuItem value="V">Validated</MenuItem>
                <MenuItem value="F">Failed</MenuItem>
              </TextField>
            ) : (
              <TextField
                label={field.label}
                fullWidth
                value={formData.PEPERT?.[field.name] || ""}
                onChange={handleChange(field.name)}
              />
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PEPERT;
