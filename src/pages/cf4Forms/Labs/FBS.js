import React, { useState } from "react";
import {
  Grid, TextField, Button, MenuItem, Paper, Typography, Box
} from "@mui/material";

const initialFbs = {
  pHciTransNo: "",
  pReferralFacility: "",
  pLabDate: "",
  pGlucoseMg: "",
  pGlucoseMmol: "",
  pDateAdded: "",
  pIsApplicable: "Y",
  pModule: "",
  pDiagnosticLabFee: "",
  pCoPay: "",
  pReportStatus: "U",
  pDeficiencyRemarks: "",
};

const FBS = ({ data, setData }) => {
  const [entry, setEntry] = useState(initialFbs);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEntry((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    setData((prev) => [...prev, entry]);
    setEntry(initialFbs);
  };

  return (
    <Paper sx={{ p: 2, mt: 2 }} variant="outlined">
      <Typography variant="h6">Add FBS Record</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField fullWidth label="HCI Trans No" name="pHciTransNo" value={entry.pHciTransNo} onChange={handleChange} />
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth label="Referral Facility" name="pReferralFacility" value={entry.pReferralFacility} onChange={handleChange} />
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth type="date" label="Lab Date" name="pLabDate" InputLabelProps={{ shrink: true }} value={entry.pLabDate} onChange={handleChange} />
        </Grid>
        <Grid item xs={3}>
          <TextField fullWidth label="Glucose (mg/dL)" name="pGlucoseMg" value={entry.pGlucoseMg} onChange={handleChange} />
        </Grid>
        <Grid item xs={3}>
          <TextField fullWidth label="Glucose (mmol/L)" name="pGlucoseMmol" value={entry.pGlucoseMmol} onChange={handleChange} />
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth type="date" label="Date Added" name="pDateAdded" InputLabelProps={{ shrink: true }} value={entry.pDateAdded} onChange={handleChange} />
        </Grid>
        <Grid item xs={3}>
          <TextField select fullWidth label="Is Applicable" name="pIsApplicable" value={entry.pIsApplicable} onChange={handleChange}>
            <MenuItem value="Y">Yes</MenuItem>
            <MenuItem value="N">No</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={3}>
          <TextField fullWidth label="Module" name="pModule" value={entry.pModule} onChange={handleChange} />
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth label="Diagnostic Lab Fee" name="pDiagnosticLabFee" value={entry.pDiagnosticLabFee} onChange={handleChange} />
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth label="CoPay" name="pCoPay" value={entry.pCoPay} onChange={handleChange} />
        </Grid>
        <Grid item xs={6}>
          <TextField select fullWidth label="Report Status" name="pReportStatus" value={entry.pReportStatus} onChange={handleChange}>
            <MenuItem value="U">Unverified</MenuItem>
            <MenuItem value="V">Verified</MenuItem>
            <MenuItem value="F">Final</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth label="Deficiency Remarks" name="pDeficiencyRemarks" value={entry.pDeficiencyRemarks} onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleAdd}>Add FBS Record</Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FBS;
