import React, { useState } from "react";
import {
  Grid, TextField, Button, Typography, MenuItem, Box
} from "@mui/material";

const defaultCBC = {
  pHciTransNo: "",
  pReferralFacility: "",
  pLabDate: "",
  pHematocrit: "",
  pHemoglobinG: "",
  pHemoglobinMmol: "",
  pMhcPg: "",
  pMhcFmol: "",
  pMchcGhb: "",
  pMchcMmol: "",
  pMcvUm: "",
  pMcvFl: "",
  pWbc1000: "",
  pWbc10: "",
  pMyelocyte: "",
  pNeutrophilsBnd: "",
  pNeutrophilsSeg: "",
  pLymphocytes: "",
  pMonocytes: "",
  pEosinophils: "",
  pBasophils: "",
  pPlatelet: "",
  pDateAdded: "",
  pIsApplicable: "Y",
  pModule: "",
  pDiagnosticLabFee: "",
  pCoPay: "",
  pReportStatus: "U",
  pDeficiencyRemarks: ""
};

export default function CBC({ data, setData }) {
  const [cbcList, setCbcList] = useState([defaultCBC]);

  const handleChange = (index, field, value) => {
    const updated = [...cbcList];
    updated[index][field] = value;
    setCbcList(updated);
    setData(updated); // propagate to parent
  };

  const handleAdd = () => {
    setCbcList([...cbcList, { ...defaultCBC }]);
  };

  const handleRemove = (index) => {
    const updated = cbcList.filter((_, i) => i !== index);
    setCbcList(updated);
    setData(updated);
  };

  return (
    <Box>
      <Typography variant="h6">CBC Results</Typography>
      {cbcList.map((cbc, index) => (
        <Box key={index} sx={{ border: '1px solid #ccc', p: 2, mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField label="HCI Trans No" value={cbc.pHciTransNo} fullWidth onChange={(e) => handleChange(index, "pHciTransNo", e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Referral Facility" value={cbc.pReferralFacility} fullWidth onChange={(e) => handleChange(index, "pReferralFacility", e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField type="date" label="Lab Date" value={cbc.pLabDate} fullWidth InputLabelProps={{ shrink: true }} onChange={(e) => handleChange(index, "pLabDate", e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Hematocrit" value={cbc.pHematocrit} fullWidth onChange={(e) => handleChange(index, "pHematocrit", e.target.value)} />
            </Grid>
            {/* You can follow the same pattern for the rest of the fields */}
            {/* --- Sample Additional Fields --- */}
            <Grid item xs={12} sm={6}>
              <TextField label="WBC (x1000)" value={cbc.pWbc1000} fullWidth onChange={(e) => handleChange(index, "pWbc1000", e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Platelet" value={cbc.pPlatelet} fullWidth onChange={(e) => handleChange(index, "pPlatelet", e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Diagnostic Lab Fee" value={cbc.pDiagnosticLabFee} fullWidth onChange={(e) => handleChange(index, "pDiagnosticLabFee", e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="CoPay" value={cbc.pCoPay} fullWidth onChange={(e) => handleChange(index, "pCoPay", e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Module" value={cbc.pModule} fullWidth onChange={(e) => handleChange(index, "pModule", e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Date Added" type="date" InputLabelProps={{ shrink: true }} value={cbc.pDateAdded} fullWidth onChange={(e) => handleChange(index, "pDateAdded", e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField select label="Is Applicable" value={cbc.pIsApplicable} fullWidth onChange={(e) => handleChange(index, "pIsApplicable", e.target.value)}>
                <MenuItem value="Y">Yes</MenuItem>
                <MenuItem value="N">No</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField select label="Report Status" value={cbc.pReportStatus} fullWidth onChange={(e) => handleChange(index, "pReportStatus", e.target.value)}>
                <MenuItem value="U">Unverified</MenuItem>
                <MenuItem value="V">Verified</MenuItem>
                <MenuItem value="F">Final</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField label="Deficiency Remarks" value={cbc.pDeficiencyRemarks} fullWidth multiline onChange={(e) => handleChange(index, "pDeficiencyRemarks", e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined" color="error" onClick={() => handleRemove(index)}>Remove</Button>
            </Grid>
          </Grid>
        </Box>
      ))}
      <Button variant="contained" onClick={handleAdd} sx={{ mt: 2 }}>Add CBC Entry</Button>
    </Box>
  );
}
