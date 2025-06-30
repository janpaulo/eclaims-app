import React from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";

const SpecialConsiderations = ({
  formData = {}, // fallback default to avoid undefined error
  setFormData,
  dateAdmitted,
  dateDischarged,
  packageType,
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

      <Grid container spacing={2}>
        <Grid item md={6} sm={3} mt={2}>
          <FormControl fullWidth margin="dense">
            <InputLabel id="zBenefitPackageCode-label">
              Z-Benefit Package Code
            </InputLabel>
            <Select
              labelId="zBenefitPackageCode-label"
              name="pZBenefitCode"
              value={formData.pZBenefitCode || ""}
              onChange={handleChange}
              label="Z-Benefit Package Code"
              disabled={packageType === "All Case Rate"}
            >
              {[
                "Z0011",
                "Z0012",
                "Z0013",
                "Z0021",
                "Z0022",
                "Z003",
                "Z0041",
                "Z0042",
                "Z0051",
                "Z0052",
                "Z0061",
                "Z0062",
                "Z0071",
                "Z0072",
                "Z0081",
                "Z0082",
                "Z0091",
                "Z0092",
              ].map((code) => (
                <MenuItem key={code} value={code}>
                  {code}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={6} sm={3} mt={3}>
          <TextField
            name="pPreAuthDate"
            label="Auth Date"
            fullWidth
            type="date"
            mt={2}
            InputLabelProps={{ shrink: true }}
            value={formData.pPreAuthDate || ""}
            onChange={handleChange}
            disabled={packageType === "All Case Rate"}
          />
        </Grid>
      </Grid>

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
      <Grid container spacing={2} mt={2}>
        <Grid item xs={6}>
          <Typography mt={2}>d. For TB DOTS Package</Typography>
          {["Intensive Phase", "Maintenance Phase"].map((label) => (
            <FormControlLabel
              key={label}
              control={
                <Checkbox
                  name={label}
                  checked={formData[label] || false}
                  onChange={(e) => {
                    const selected = e.target.name;
                    const checked = e.target.checked;

                    if (checked) {
                      setFormData({
                        "Intensive Phase": false,
                        "Maintenance Phase": false,
                        [selected]: true, // only this one is true
                      });
                    } else {
                      // Optional: uncheck all if user clicks again to deselect
                      setFormData({
                        "Intensive Phase": false,
                        "Maintenance Phase": false,
                      });
                    }
                  }}
                />
              }
              label={label}
            />
          ))}
        </Grid>
        <Grid item xs={6} mt={4}>
          <TextField
            name="pNTPCardNo"
            label="Card No."
            fullWidth
            value={formData.pNTPCardNo || ""}
            onChange={handleChange}
          />
        </Grid>
      </Grid>

      <Typography mt={2}>e. For Animal Bite Package</Typography>
      <Grid container spacing={2}>
        {["Day 0 ARV", "Day 3 ARV", "Day 7 ARV", "RIG"].map((label, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <TextField
              name={label}
              label={label}
              type="date"
              fullWidth
              value={formData[label] || ""}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        ))}
        <Grid item xs={6}>
          <TextField
            name="pABPOthers"
            label="Others"
            fullWidth
            value={formData.pABPOthers || ""}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="pABPSpecify"
            label="Specify"
            fullWidth
            value={formData.pABPSpecify || ""}
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

        <Grid item xs={12}>
          <Typography gutterBottom>
            g. For Outpatient HIV/AIDS Treatment Package
            <TextField
              name="pLaboratoryNumber"
              label="Laboratory Number:"
              fullWidth
              value={formData.pLaboratoryNumber || ""}
              onChange={handleChange}
            />
          </Typography>
        </Grid>

        
        <Grid item xs={12} md={12}>
          <Typography gutterBottom>h. Cataract Information</Typography>

          {/* Checkbox for Cataract information */}
          <Grid item xs={12} sm={6} md={4}>
            <FormControlLabel
              control={
                <Checkbox
                  name="isCataract"
                  checked={formData.isCataract || false}
                  onChange={handleCheckboxToggle} // Toggle the state of "isCataract"
                />
              }
              label="Does the patient have cataracts?"
            />
          </Grid>
        </Grid>

        {/* Fields that depend on the checkbox */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <TextField
              fullWidth
              name="pCataractPreAuth"
              label="Cataract Pre-Auth Code"
              value={formData.pCataractPreAuth || ""}
              onChange={handleChange}
              disabled={!formData.isCataract} // Disable field if "isCataract" is false
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              name="pLeftEyeIOLStickerNumber"
              label="Left Eye IOL Sticker Number"
              value={formData.pLeftEyeIOLStickerNumber || ""}
              onChange={handleChange}
              disabled={!formData.isCataract} // Disable field if "isCataract" is false
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              name="pLeftEyeIOLExpiryDate"
              label="Left Eye IOL Expiry Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.pLeftEyeIOLExpiryDate || ""}
              onChange={handleChange}
              disabled={!formData.isCataract} // Disable field if "isCataract" is false
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              name="pRightEyeIOLStickerNumber"
              label="Right Eye IOL Sticker Number"
              value={formData.pRightEyeIOLStickerNumber || ""}
              onChange={handleChange}
              disabled={!formData.isCataract} // Disable field if "isCataract" is false
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Right Eye IOL Expiry Date"
              type="date"
              name="pRightEyeIOLExpiryDate"
              InputLabelProps={{ shrink: true }}
              value={formData.pRightEyeIOLExpiryDate || ""}
              onChange={handleChange}
              disabled={!formData.isCataract} // Disable field if "isCataract" is false
            />
          </Grid>
        </Grid>


      </Grid>
    </Box>
  );
};

export default SpecialConsiderations;
