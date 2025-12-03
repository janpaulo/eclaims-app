import React from "react";
import {
  Grid,
  TextField,
  IconButton,
  Typography,
  MenuItem,
  Button,
} from "@mui/material";
import { AddCircle, RemoveCircle } from "@mui/icons-material";

const initialPapSmearEntry = {
  pHciTransNo: "",
  pReferralFacility: "",
  pLabDate: "",
  pFindings: "",
  pImpression: "",
  pDateAdded: "",
  pIsApplicable: "Y",
  pModule: "",
  pDiagnosticLabFee: "",
  pCoPay: "",
  pReportStatus: "U",
  pDeficiencyRemarks: "",
};

export default function PAPSSMEAR({ papSmearList=[], setPapSmearList }) {
  const handleChange = (index, field, value) => {
    const updated = [...papSmearList];
    updated[index][field] = value;
    setPapSmearList(updated);
  };

  const handleAdd = () => {
    setPapSmearList([...papSmearList, { ...initialPapSmearEntry }]);
  };

  const handleRemove = (index) => {
    const updated = [...papSmearList];
    updated.splice(index, 1);
    setPapSmearList(updated);
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        PAP SMEAR
      </Typography>
      {papSmearList.map((entry, index) => (
        <Grid
          container
          spacing={2}
          key={index}
          sx={{ border: "1px solid #ccc", p: 2, mb: 2, borderRadius: 2 }}
        >
          <Grid item xs={12} sm={6}>
            <TextField
              label="HCI Trans No"
              fullWidth
              value={entry.pHciTransNo}
              onChange={(e) =>
                handleChange(index, "pHciTransNo", e.target.value)
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Referral Facility"
              fullWidth
              value={entry.pReferralFacility}
              onChange={(e) =>
                handleChange(index, "pReferralFacility", e.target.value)
              }
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Lab Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={entry.pLabDate}
              onChange={(e) => handleChange(index, "pLabDate", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Findings"
              fullWidth
              value={entry.pFindings}
              onChange={(e) => handleChange(index, "pFindings", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Impression"
              fullWidth
              value={entry.pImpression}
              onChange={(e) =>
                handleChange(index, "pImpression", e.target.value)
              }
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Date Added"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={entry.pDateAdded}
              onChange={(e) =>
                handleChange(index, "pDateAdded", e.target.value)
              }
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              select
              label="Is Applicable"
              fullWidth
              value={entry.pIsApplicable}
              onChange={(e) =>
                handleChange(index, "pIsApplicable", e.target.value)
              }
            >
              <MenuItem value="Y">Yes</MenuItem>
              <MenuItem value="N">No</MenuItem>
              <MenuItem value="W">Waived</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Module"
              fullWidth
              value={entry.pModule}
              onChange={(e) => handleChange(index, "pModule", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Diagnostic Lab Fee"
              fullWidth
              value={entry.pDiagnosticLabFee}
              onChange={(e) =>
                handleChange(index, "pDiagnosticLabFee", e.target.value)
              }
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="CoPay"
              fullWidth
              value={entry.pCoPay}
              onChange={(e) => handleChange(index, "pCoPay", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              select
              label="Report Status"
              fullWidth
              value={entry.pReportStatus}
              onChange={(e) =>
                handleChange(index, "pReportStatus", e.target.value)
              }
            >
              <MenuItem value="U">Unverified</MenuItem>
              <MenuItem value="V">Verified</MenuItem>
              <MenuItem value="F">Final</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Deficiency Remarks"
              fullWidth
              multiline
              value={entry.pDeficiencyRemarks}
              onChange={(e) =>
                handleChange(index, "pDeficiencyRemarks", e.target.value)
              }
            />
          </Grid>
          <Grid item xs={12}>
            <IconButton
              color="error"
              onClick={() => handleRemove(index)}
              disabled={papSmearList.length === 1}
            >
              <RemoveCircle />
            </IconButton>
          </Grid>
        </Grid>
      ))}
      <Button
        startIcon={<AddCircle />}
        variant="outlined"
        onClick={handleAdd}
      >
        Add PAP SMEAR
      </Button>
    </>
  );
}
