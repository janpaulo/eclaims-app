import React, { useState } from "react";
import {
  TextField,
  Grid,
  Button,
  MenuItem,
  Typography,
  Box,
  Divider,
} from "@mui/material";

const initialSputum = {
  pHciTransNo: "",
  pReferralFacility: "",
  pLabDate: "",
  pDataCollection: "",
  pFindings: "",
  pRemarks: "",
  pNoPlusses: "",
  pDateAdded: "",
  pIsApplicable: "Y",
  pModule: "",
  pDiagnosticLabFee: "",
  pCoPay: "",
  pReportStatus: "U",
  pDeficiencyRemarks: "",
};

export default function SPUTUM({ sputumData=[], setSputumData }) {
  const handleChange = (index, field, value) => {
    const updated = [...sputumData];
    updated[index][field] = value;
    setSputumData(updated);
  };

  const addEntry = () => {
    setSputumData([...sputumData, { ...initialSputum }]);
  };

  const removeEntry = (index) => {
    const updated = sputumData.filter((_, i) => i !== index);
    setSputumData(updated);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        SPUTUM Records
      </Typography>

      {sputumData.map((entry, index) => (
        <Box key={index} sx={{ mb: 3, p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField label="HCI Trans No" fullWidth value={entry.pHciTransNo} onChange={(e) => handleChange(index, "pHciTransNo", e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Referral Facility" fullWidth value={entry.pReferralFacility} onChange={(e) => handleChange(index, "pReferralFacility", e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Lab Date" fullWidth type="date" InputLabelProps={{ shrink: true }} value={entry.pLabDate} onChange={(e) => handleChange(index, "pLabDate", e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField select label="Data Collection" fullWidth value={entry.pDataCollection} onChange={(e) => handleChange(index, "pDataCollection", e.target.value)}>
                {["1", "2", "3", "X"].map((val) => (
                  <MenuItem key={val} value={val}>{val}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField label="Findings" fullWidth value={entry.pFindings} onChange={(e) => handleChange(index, "pFindings", e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Remarks" fullWidth value={entry.pRemarks} onChange={(e) => handleChange(index, "pRemarks", e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="No. of Plusses" fullWidth value={entry.pNoPlusses} onChange={(e) => handleChange(index, "pNoPlusses", e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Date Added" fullWidth type="date" InputLabelProps={{ shrink: true }} value={entry.pDateAdded} onChange={(e) => handleChange(index, "pDateAdded", e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField select label="Is Applicable" fullWidth value={entry.pIsApplicable} onChange={(e) => handleChange(index, "pIsApplicable", e.target.value)}>
                <MenuItem value="Y">Yes</MenuItem>
                <MenuItem value="N">No</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField label="Module" fullWidth value={entry.pModule} onChange={(e) => handleChange(index, "pModule", e.target.value)} />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Diagnostic Lab Fee" fullWidth value={entry.pDiagnosticLabFee} onChange={(e) => handleChange(index, "pDiagnosticLabFee", e.target.value)} />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Co-Pay" fullWidth value={entry.pCoPay} onChange={(e) => handleChange(index, "pCoPay", e.target.value)} />
            </Grid>
            <Grid item xs={6}>
              <TextField select label="Report Status" fullWidth value={entry.pReportStatus} onChange={(e) => handleChange(index, "pReportStatus", e.target.value)}>
                <MenuItem value="U">Unvalidated</MenuItem>
                <MenuItem value="V">Validated</MenuItem>
                <MenuItem value="F">Final</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField label="Deficiency Remarks" fullWidth value={entry.pDeficiencyRemarks} onChange={(e) => handleChange(index, "pDeficiencyRemarks", e.target.value)} />
            </Grid>

            <Grid item xs={12}>
              <Button variant="outlined" color="error" onClick={() => removeEntry(index)}>Remove</Button>
            </Grid>
          </Grid>
        </Box>
      ))}

      <Button variant="contained" onClick={addEntry}>Add SPUTUM Entry</Button>
      <Divider sx={{ my: 3 }} />
    </Box>
  );
}
