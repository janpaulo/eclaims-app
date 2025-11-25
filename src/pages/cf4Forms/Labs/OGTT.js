import React, { useState } from 'react';
import {
  Box, Grid, TextField, Button, Typography, MenuItem
} from '@mui/material';

const initialOgttEntry = {
  pHciTransNo: '',
  pReferralFacility: '',
  pLabDate: '',
  pExamFastingMg: '',
  pExamFastingMmol: '',
  pExamOgttOneHrMg: '',
  pExamOgttOneHrMmol: '',
  pExamOgttTwoHrMg: '',
  pExamOgttTwoHrMmol: '',
  pDateAdded: '',
  pIsApplicable: 'Y',
  pModule: '',
  pDiagnosticLabFee: '',
  pCoPay: '',
  pReportStatus: 'U',
  pDeficiencyRemarks: ''
};

export default function OGTT() {
  const [ogttList, setOgttList] = useState([initialOgttEntry]);

  const handleChange = (index, field, value) => {
    const updatedList = [...ogttList];
    updatedList[index][field] = value;
    setOgttList(updatedList);
  };

  const addOGTT = () => {
    setOgttList([...ogttList, { ...initialOgttEntry }]);
  };

  const removeOGTT = (index) => {
    const updatedList = ogttList.filter((_, i) => i !== index);
    setOgttList(updatedList);
  };

  return (
    <Box>
      <Typography variant="h6">OGTT Results</Typography>
      {ogttList.map((ogtt, index) => (
        <Box key={index} border={1} borderRadius={2} p={2} mt={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="HCI Trans No" value={ogtt.pHciTransNo} onChange={e => handleChange(index, 'pHciTransNo', e.target.value)} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Referral Facility" value={ogtt.pReferralFacility} onChange={e => handleChange(index, 'pReferralFacility', e.target.value)} />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField type="date" fullWidth label="Lab Date" InputLabelProps={{ shrink: true }} value={ogtt.pLabDate} onChange={e => handleChange(index, 'pLabDate', e.target.value)} />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField fullWidth label="Fasting (mg/dL)" value={ogtt.pExamFastingMg} onChange={e => handleChange(index, 'pExamFastingMg', e.target.value)} />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField fullWidth label="Fasting (mmol/L)" value={ogtt.pExamFastingMmol} onChange={e => handleChange(index, 'pExamFastingMmol', e.target.value)} />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField fullWidth label="OGTT 1 Hr (mg/dL)" value={ogtt.pExamOgttOneHrMg} onChange={e => handleChange(index, 'pExamOgttOneHrMg', e.target.value)} />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField fullWidth label="OGTT 1 Hr (mmol/L)" value={ogtt.pExamOgttOneHrMmol} onChange={e => handleChange(index, 'pExamOgttOneHrMmol', e.target.value)} />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField fullWidth label="OGTT 2 Hr (mg/dL)" value={ogtt.pExamOgttTwoHrMg} onChange={e => handleChange(index, 'pExamOgttTwoHrMg', e.target.value)} />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField fullWidth label="OGTT 2 Hr (mmol/L)" value={ogtt.pExamOgttTwoHrMmol} onChange={e => handleChange(index, 'pExamOgttTwoHrMmol', e.target.value)} />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField fullWidth label="Module" value={ogtt.pModule} onChange={e => handleChange(index, 'pModule', e.target.value)} />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField fullWidth label="Diagnostic Lab Fee" value={ogtt.pDiagnosticLabFee} onChange={e => handleChange(index, 'pDiagnosticLabFee', e.target.value)} />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField fullWidth label="CoPay" value={ogtt.pCoPay} onChange={e => handleChange(index, 'pCoPay', e.target.value)} />
            </Grid>

            <Grid item xs={6} md={3}>
              <TextField select fullWidth label="Is Applicable" value={ogtt.pIsApplicable} onChange={e => handleChange(index, 'pIsApplicable', e.target.value)}>
                <MenuItem value="Y">Yes</MenuItem>
                <MenuItem value="N">No</MenuItem>
                <MenuItem value="W">Withheld</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField select fullWidth label="Report Status" value={ogtt.pReportStatus} onChange={e => handleChange(index, 'pReportStatus', e.target.value)}>
                <MenuItem value="U">Unverified</MenuItem>
                <MenuItem value="V">Verified</MenuItem>
                <MenuItem value="F">Final</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Deficiency Remarks" value={ogtt.pDeficiencyRemarks} onChange={e => handleChange(index, 'pDeficiencyRemarks', e.target.value)} />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField type="datetime-local" fullWidth label="Date Added" InputLabelProps={{ shrink: true }} value={ogtt.pDateAdded} onChange={e => handleChange(index, 'pDateAdded', e.target.value)} />
            </Grid>
          </Grid>

          <Box mt={2}>
            <Button variant="outlined" color="error" onClick={() => removeOGTT(index)} disabled={ogttList.length === 1}>
              Remove
            </Button>
          </Box>
        </Box>
      ))}

      <Box mt={3}>
        <Button variant="contained" onClick={addOGTT}>Add OGTT Entry</Button>
      </Box>
    </Box>
  );
}
