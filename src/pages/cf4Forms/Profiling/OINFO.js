import React from "react";
import {
  Typography,
  TextField,
  Box,
  Grid,
  MenuItem,
} from "@mui/material";

const OInfo = ({ formData, setFormData }) => {
  const oinfo = formData.OINFO || {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      OINFO: {
        ...oinfo,
        [name]: value,
      },
    });
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        OINFO
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <TextField
            name="pPatientPob"
            label="Place of Birth"
            fullWidth
            value={oinfo.pPatientPob || ""}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            name="pPatientAge"
            label="Age"
            fullWidth
            value={oinfo.pPatientAge || ""}
            onChange={handleChange}
            type="number"
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            name="pPatientOccupation"
            label="Occupation"
            fullWidth
            value={oinfo.pPatientOccupation || ""}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            name="pPatientEducation"
            label="Education"
            fullWidth
            value={oinfo.pPatientEducation || ""}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            name="pPatientReligion"
            label="Religion"
            fullWidth
            value={oinfo.pPatientReligion || ""}
            onChange={handleChange}
          />
        </Grid>

        {/* Mother Info */}
        <Grid item xs={12} sm={3}>
          <TextField
            name="pPatientMotherLn"
            label="Mother Last Name"
            fullWidth
            value={oinfo.pPatientMotherLn || ""}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            name="pPatientMotherMnmi"
            label="Mother Middle Name"
            fullWidth
            value={oinfo.pPatientMotherMnmi || ""}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            name="pPatientMotherFn"
            label="Mother First Name"
            fullWidth
            value={oinfo.pPatientMotherFn || ""}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            name="pPatientMotherExtn"
            label="Mother Suffix"
            fullWidth
            value={oinfo.pPatientMotherExtn || ""}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            name="pPatientMotherBday"
            label="Mother Birthday"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={oinfo.pPatientMotherBday || ""}
            onChange={handleChange}
          />
        </Grid>

        {/* Father Info */}
        <Grid item xs={12} sm={3}>
          <TextField
            name="pPatientFatherLn"
            label="Father Last Name"
            fullWidth
            value={oinfo.pPatientFatherLn || ""}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            name="pPatientFatherMi"
            label="Father Middle Initial"
            fullWidth
            value={oinfo.pPatientFatherMi || ""}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            name="pPatientFatherFn"
            label="Father First Name"
            fullWidth
            value={oinfo.pPatientFatherFn || ""}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            name="pPatientFatherExtn"
            label="Father Suffix"
            fullWidth
            value={oinfo.pPatientFatherExtn || ""}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            name="pPatientFatherBday"
            label="Father Birthday"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={oinfo.pPatientFatherBday || ""}
            onChange={handleChange}
          />
        </Grid>

        {/* Report Status */}
        <Grid item xs={12} sm={3}>
          <TextField
            name="pReportStatus"
            label="Report Status"
            fullWidth
            select
            value={oinfo.pReportStatus || ""}
            onChange={handleChange}
          >
            <MenuItem value="U">Unverified</MenuItem>
            <MenuItem value="V">Verified</MenuItem>
            <MenuItem value="F">Final</MenuItem>
          </TextField>
        </Grid>

        {/* Deficiency Remarks */}
        <Grid item xs={12}>
          <TextField
            name="pDeficiencyRemarks"
            label="Deficiency Remarks"
            fullWidth
            multiline
            rows={3}
            value={oinfo.pDeficiencyRemarks || ""}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default OInfo;
