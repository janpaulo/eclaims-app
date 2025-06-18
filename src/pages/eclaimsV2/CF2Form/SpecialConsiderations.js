import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
  Divider,
} from "@mui/material";

const SpecialConsiderations = ({
  formData,
  setFormData,
  dateAdmitted,
  dateDischarged,
}) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const generateDateRange = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const dates = [];

    while (startDate <= endDate) {
      dates.push(new Date(startDate).toISOString().split("T")[0]);
      startDate.setDate(startDate.getDate() + 1);
    }

    return dates;
  };

  const handleCheckboxToggle = (e) => {
    const { name, checked } = e.target;
    const rangeDates = checked
      ? generateDateRange(dateAdmitted, dateDischarged)
      : [];
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
      [`${name}_dates`]: checked ? rangeDates : [],
    }));
  };

  const handleDateChange = (e, label, index) => {
    const updatedDates = [...(formData[`${label}_dates`] || [])];
    updatedDates[index] = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [`${label}_dates`]: updatedDates,
    }));
  };

  const renderDateCheckboxes = (label) => {
    const dates = formData[`${label}_dates`] || [];
    return (
      <Grid container spacing={1} sx={{ mt: 1 }}>
        {dates.map((date, i) => (
          <Grid item xs={12} sm={6} key={i}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={
                    formData[`${label}_selectedDates`]?.includes(date) || false
                  }
                  onChange={(e) => {
                    const selected = formData[`${label}_selectedDates`] || [];
                    const updated = e.target.checked
                      ? [...selected, date]
                      : selected.filter((d) => d !== date);
                    setFormData((prev) => ({
                      ...prev,
                      [`${label}_selectedDates`]: updated,
                    }));
                  }}
                />
              }
              label={date}
            />
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Box p={2}>
      <Typography  gutterBottom>
        8. Special Considerations:
      </Typography>

      <Typography variant="body1">
        a. For the following repetitive procedures, check box that applies and
        enumerate the procedure/sessions dates [mm-dd-yyyy]. For chemotherapy,
        see guidelines.
      </Typography>
      <Grid container spacing={2}>
        {[
          "Hemodialysis",
          "Peritoneal Dialysis",
          "Radiotherapy (LINAC)",
          "Radiotherapy (COBALT)",
          "Blood Transfusion",
          "Brachytherapy",
          "Chemotherapy",
          "Simple Debridement",
        ].map((label, index) => (
          <Grid item xs={4} key={index}>
            <FormControlLabel
              control={
                <Checkbox
                  name={label}
                  checked={formData[label] || false}
                  onChange={handleCheckboxToggle}
                />
              }
              label={label}
            />
            {formData[label] && renderDateCheckboxes(label)}
          </Grid>
        ))}
      </Grid>

      <Typography mt={2}>b. For Z-Benefit Package</Typography>
      <TextField
        name="zBenefitPackageCode"
        label="Z-Benefit Package Code"
        fullWidth
        margin="dense"
        value={formData.zBenefitPackageCode || ""}
        onChange={handleChange}
      />
      <Typography mt={2}>
        c. For MCP Package (enumerate four dates [mm-dd-yyyy] of pre-natal
        check-ups)
      </Typography>
      <Grid container spacing={2}>
        {[1, 2, 3, 4].map((num) => (
          <Grid item xs={12} sm={3} key={num}>
            <TextField
              name={`mcpDate${num}`}
              label={`Date ${num}`}
              fullWidth
              type="date"
              value={formData[`mcpDate${num}`] || ""}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              inputProps={{
                min: dateAdmitted,
                max: dateDischarged,
              }}
            />
          </Grid>
        ))}
      </Grid>

      <Typography mt={2}>d. For TB DOTS Package</Typography>
      {["Intensive Phase", "Maintenance Phase"].map((label) => (
        <FormControlLabel
          key={label}
          control={
            <Checkbox
              name={label}
              checked={formData[label] || false}
              onChange={handleChange}
            />
          }
          label={label}
        />
      ))}

      <Typography mt={2}>e. For Animal Bite Package</Typography>
      <Grid container spacing={2}>
        {["Day 0 ARV", "Day 3 ARV", "Day 7 ARV", "RIG"].map((label, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <TextField
              name={label}
              label={label}
              fullWidth
              value={formData[label] || ""}
              onChange={handleChange}
            />
          </Grid>
        ))}
        <Grid item xs={12}>
          <TextField
            name="OthersSpecify"
            label="Others (Specify)"
            fullWidth
            value={formData.OthersSpecify || ""}
            onChange={handleChange}
          />
        </Grid>
      </Grid>

      <Typography mt={2}>f. For Newborn Care Package</Typography>
      <Grid container spacing={2}>
        {[
          "Essential Newborn Care",
          "Newborn Hearing Screening Test",
          "Newborn Screening Test",
        ].map((label, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <FormControlLabel
              control={
                <Checkbox
                  name={label}
                  checked={formData[label] || false}
                  onChange={handleChange}
                />
              }
              label={label}
            />
          </Grid>
        ))}
      </Grid>

      <Typography mt={2} fontWeight="bold">
        For Essential Newborn Care (check applicable boxes)
      </Typography>
      <Grid container spacing={2}>
        {[
          "Immediate drying of newborn",
          "Early skin-to-skin contact",
          "Timely cord clamping",
          "Eye Prophylaxis",
          "Vitamin K administration",
          "BCG vaccination",
          "Hepatitis B vaccination",
          "Non-separation of mother/baby for early breastfeeding initiation",
        ].map((label, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <FormControlLabel
              control={
                <Checkbox
                  name={label}
                  checked={formData[label] || false}
                  onChange={handleChange}
                />
              }
              label={label}
            />
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        9. PhilHealth Benefits:
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            name="ICD10orRVSCode"
            label="ICD 10 or RVS Code"
            fullWidth
            value={formData.ICD10orRVSCode || ""}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="firstCaseRate"
            label="First Case Rate"
            fullWidth
            value={formData.firstCaseRate || ""}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="secondCaseRate"
            label="Second Case Rate"
            fullWidth
            value={formData.secondCaseRate || ""}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SpecialConsiderations;
