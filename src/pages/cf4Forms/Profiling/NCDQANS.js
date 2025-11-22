import React from "react";
import { Box, Grid, TextField, Typography, MenuItem } from "@mui/material";

const NCDQANS = ({ formData, setFormData }) => {
  const ncdqans = formData.NCDQANS || {
    pQid1_Yn: "",
    pQid2_Yn: "",
    pQid3_Yn: "",
    pQid4_Yn: "",
    pQid5_Ynx: "",
    pQid6_Yn: "",
    pQid7_Yn: "",
    pQid8_Yn: "",
    pQid9_Yn: "",
    pQid10_Yn: "",
    pQid11_Yn: "",
    pQid12_Yn: "",
    pQid13_Yn: "",
    pQid14_Yn: "",
    pQid15_Yn: "",
    pQid16_Yn: "",
    pQid17_Abcde: "",
    pQid18_Yn: "",
    pQid19_Yn: "",
    pQid19_Fbsmg: "",
    pQid19_Fbsmmol: "",
    pQid19_Fbsdate: "",
    pQid20_Yn: "",
    pQid20_Choleval: "",
    pQid20_Choledate: "",
    pQid21_Yn: "",
    pQid21_Ketonval: "",
    pQid21_Ketondate: "",
    pQid22_Yn: "",
    pQid22_Proteinval: "",
    pQid22_Proteindate: "",
    pQid23_Yn: "",
    pQid24_Yn: "",
    pReportStatus: "",
    pDeficiencyRemarks: "",
  };

  const handleChange = (field, value) => {
    const updated = { ...ncdqans, [field]: value };
    setFormData({ ...formData, NCDQANS: updated });
  };

  const yesNoFields = [
    "pQid1_Yn",
    "pQid2_Yn",
    "pQid3_Yn",
    "pQid4_Yn",
    "pQid5_Ynx",
    "pQid6_Yn",
    "pQid7_Yn",
    "pQid8_Yn",
    "pQid9_Yn",
    "pQid10_Yn",
    "pQid11_Yn",
    "pQid12_Yn",
    "pQid13_Yn",
    "pQid14_Yn",
    "pQid15_Yn",
    "pQid16_Yn",
    "pQid18_Yn",
    "pQid19_Yn",
    "pQid20_Yn",
    "pQid21_Yn",
    "pQid22_Yn",
    "pQid23_Yn",
    "pQid24_Yn",
  ];

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Patient Answer to NCD Questionnaires (For Patient Aged 25 Years Old)
      </Typography>
      <Grid container spacing={2}>
        {yesNoFields.map((field) => (
          <Grid item xs={12} sm={3} key={field}>
            <TextField
              fullWidth
              label={field}
              value={ncdqans[field]}
              onChange={(e) => handleChange(field, e.target.value)}
            />
          </Grid>
        ))}

        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="pQid17_Abcde"
            value={ncdqans.pQid17_Abcde}
            onChange={(e) => handleChange("pQid17_Abcde", e.target.value)}
          />
        </Grid>

        {/* pQid19 */}
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="pQid19_Fbsmg"
            value={ncdqans.pQid19_Fbsmg}
            onChange={(e) => handleChange("pQid19_Fbsmg", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="pQid19_Fbsmmol"
            value={ncdqans.pQid19_Fbsmmol}
            onChange={(e) => handleChange("pQid19_Fbsmmol", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="pQid19_Fbsdate"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={ncdqans.pQid19_Fbsdate}
            onChange={(e) => handleChange("pQid19_Fbsdate", e.target.value)}
          />
        </Grid>

        {/* pQid20 */}
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="pQid20_Choleval"
            value={ncdqans.pQid20_Choleval}
            onChange={(e) => handleChange("pQid20_Choleval", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="pQid20_Choledate"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={ncdqans.pQid20_Choledate}
            onChange={(e) => handleChange("pQid20_Choledate", e.target.value)}
          />
        </Grid>

        {/* pQid21 */}
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="pQid21_Ketonval"
            value={ncdqans.pQid21_Ketonval}
            onChange={(e) => handleChange("pQid21_Ketonval", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="pQid21_Ketondate"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={ncdqans.pQid21_Ketondate}
            onChange={(e) => handleChange("pQid21_Ketondate", e.target.value)}
          />
        </Grid>

        {/* pQid22 */}
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="pQid22_Proteinval"
            value={ncdqans.pQid22_Proteinval}
            onChange={(e) => handleChange("pQid22_Proteinval", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="pQid22_Proteindate"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={ncdqans.pQid22_Proteindate}
            onChange={(e) => handleChange("pQid22_Proteindate", e.target.value)}
          />
        </Grid>

        {/* Report Status and Remarks */}
        <Grid item xs={12} sm={3}>
          <TextField
            select
            label="Report Status"
            fullWidth
            value={ncdqans.pReportStatus}
            onChange={(e) => handleChange("pReportStatus", e.target.value)}
          >
            <MenuItem value="U">Unverified</MenuItem>
            <MenuItem value="V">Verified</MenuItem>
            <MenuItem value="F">Final</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Deficiency Remarks"
            value={ncdqans.pDeficiencyRemarks}
            onChange={(e) => handleChange("pDeficiencyRemarks", e.target.value)}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default NCDQANS;
