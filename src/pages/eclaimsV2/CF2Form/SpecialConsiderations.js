import React from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

const SpecialConsiderations = ({
  formData = {}, // fallback default to avoid undefined error
  setFormData,
  dateAdmitted,
  dateDischarged,
}) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
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
    setFormData({
      ...formData,
      [name]: checked,
      [`${name}_dates`]: checked ? rangeDates : [],
    });
  };

  const handleDateChange = (e, label, index) => {
    const updatedDates = [...(formData[`${label}_dates`] || [])];
    updatedDates[index] = e.target.value;
    setFormData({
      ...formData,
      [`${label}_dates`]: updatedDates,
    });
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
                    setFormData({
                      ...formData,
                      [`${label}_selectedDates`]: updated,
                    });
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
      <Typography gutterBottom>8. Special Considerations:</Typography>

      <Typography variant="body1" gutterBottom>
        a. For the following repetitive procedures, check box that applies and
        enumerate the procedure/sessions dates [yyyy-mm-dd]. For chemotherapy,
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
          <Grid item xs={12} sm={6} md={4} key={index}>
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
        c. For MCP Package (enumerate four dates [yyyy-mm-dd] of pre-natal
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
    </Box>
  );
};

export default SpecialConsiderations;
