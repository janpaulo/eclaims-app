import React, { useState } from "react";
import {
  Grid, TextField, Button, MenuItem, Typography, Box, Divider
} from "@mui/material";

const initialFecalysis = {
  pHciTransNo: "",
  pReferralFacility: "",
  pLabDate: "",
  pColor: "",
  pConsistency: "",
  pRbc: "",
  pWbc: "",
  pOva: "",
  pParasite: "",
  pBlood: "",
  pOccultBlood: "",
  pPusCells: "",
  pDateAdded: "",
  pIsApplicable: "Y",
  pModule: "",
  pDiagnosticLabFee: "",
  pCoPay: "",
  pReportStatus: "U",
  pDeficiencyRemarks: ""
};

export default function FECALYSIS({ fecalysisData=[], setFecalysisData }) {
  const handleChange = (index, e) => {
    const updated = [...fecalysisData];
    updated[index][e.target.name] = e.target.value;
    setFecalysisData(updated);
  };

  const handleAdd = () => {
    setFecalysisData([...fecalysisData, { ...initialFecalysis }]);
  };

  const handleRemove = (index) => {
    const updated = [...fecalysisData];
    updated.splice(index, 1);
    setFecalysisData(updated);
  };

  return (
    <Box mt={2}>
      <Typography variant="h6" gutterBottom>Fecalysis Records</Typography>
      {fecalysisData.map((entry, index) => (
        <Box key={index} border={1} borderRadius={2} p={2} mb={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}><TextField label="HCI Trans No" name="pHciTransNo" fullWidth value={entry.pHciTransNo} onChange={(e) => handleChange(index, e)} /></Grid>
            <Grid item xs={12} sm={6}><TextField label="Referral Facility" name="pReferralFacility" fullWidth value={entry.pReferralFacility} onChange={(e) => handleChange(index, e)} /></Grid>
            <Grid item xs={12} sm={6}><TextField type="date" label="Lab Date" name="pLabDate" fullWidth InputLabelProps={{ shrink: true }} value={entry.pLabDate} onChange={(e) => handleChange(index, e)} /></Grid>
            <Grid item xs={6}><TextField label="Color" name="pColor" fullWidth value={entry.pColor} onChange={(e) => handleChange(index, e)} /></Grid>
            <Grid item xs={6}><TextField label="Consistency" name="pConsistency" fullWidth value={entry.pConsistency} onChange={(e) => handleChange(index, e)} /></Grid>
            <Grid item xs={6}><TextField label="RBC" name="pRbc" fullWidth value={entry.pRbc} onChange={(e) => handleChange(index, e)} /></Grid>
            <Grid item xs={6}><TextField label="WBC" name="pWbc" fullWidth value={entry.pWbc} onChange={(e) => handleChange(index, e)} /></Grid>
            <Grid item xs={6}><TextField label="Ova" name="pOva" fullWidth value={entry.pOva} onChange={(e) => handleChange(index, e)} /></Grid>
            <Grid item xs={6}><TextField label="Parasite" name="pParasite" fullWidth value={entry.pParasite} onChange={(e) => handleChange(index, e)} /></Grid>
            <Grid item xs={6}><TextField label="Blood" name="pBlood" fullWidth value={entry.pBlood} onChange={(e) => handleChange(index, e)} /></Grid>
            <Grid item xs={6}><TextField label="Occult Blood" name="pOccultBlood" fullWidth value={entry.pOccultBlood} onChange={(e) => handleChange(index, e)} /></Grid>
            <Grid item xs={6}><TextField label="Pus Cells" name="pPusCells" fullWidth value={entry.pPusCells} onChange={(e) => handleChange(index, e)} /></Grid>
            <Grid item xs={6}><TextField type="date" label="Date Added" name="pDateAdded" fullWidth InputLabelProps={{ shrink: true }} value={entry.pDateAdded} onChange={(e) => handleChange(index, e)} /></Grid>
            <Grid item xs={6}><TextField select label="Is Applicable" name="pIsApplicable" fullWidth value={entry.pIsApplicable} onChange={(e) => handleChange(index, e)}>
              <MenuItem value="Y">Yes</MenuItem>
              <MenuItem value="N">No</MenuItem>
            </TextField></Grid>
            <Grid item xs={6}><TextField label="Module" name="pModule" fullWidth value={entry.pModule} onChange={(e) => handleChange(index, e)} /></Grid>
            <Grid item xs={6}><TextField label="Diagnostic Lab Fee" name="pDiagnosticLabFee" fullWidth value={entry.pDiagnosticLabFee} onChange={(e) => handleChange(index, e)} /></Grid>
            <Grid item xs={6}><TextField label="CoPay" name="pCoPay" fullWidth value={entry.pCoPay} onChange={(e) => handleChange(index, e)} /></Grid>
            <Grid item xs={6}><TextField select label="Report Status" name="pReportStatus" fullWidth value={entry.pReportStatus} onChange={(e) => handleChange(index, e)}>
              <MenuItem value="U">Unverified</MenuItem>
              <MenuItem value="V">Verified</MenuItem>
              <MenuItem value="F">Final</MenuItem>
            </TextField></Grid>
            <Grid item xs={12}><TextField label="Deficiency Remarks" name="pDeficiencyRemarks" fullWidth multiline value={entry.pDeficiencyRemarks} onChange={(e) => handleChange(index, e)} /></Grid>
            <Grid item xs={12}>
              <Button variant="outlined" color="error" onClick={() => handleRemove(index)}>Remove Entry</Button>
            </Grid>
          </Grid>
        </Box>
      ))}
      <Divider />
      <Box mt={2}>
        <Button variant="contained" onClick={handleAdd}>Add New Fecalysis</Button>
      </Box>
    </Box>
  );
}
