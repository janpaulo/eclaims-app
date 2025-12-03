import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  MenuItem,
} from "@mui/material";

const defaultEntry = {
  pHciTransNo: "",
  pReferralFacility: "",
  pLabDate: "",
  pGravity: "",
  pAppearance: "",
  pColor: "",
  pGlucose: "",
  pProteins: "",
  pKetones: "",
  pPh: "",
  pRbCells: "",
  pWbCells: "",
  pBacteria: "",
  pCrystals: "",
  pBladderCell: "",
  pSquamousCell: "",
  pTubularCell: "",
  pBroadCasts: "",
  pEpithelialCast: "",
  pGranularCast: "",
  pHyalineCast: "",
  pRbcCast: "",
  pWaxyCast: "",
  pWcCast: "",
  pAlbumin: "",
  pPusCells: "",
  pDateAdded: "",
  pIsApplicable: "Y",
  pModule: "",
  pDiagnosticLabFee: "",
  pCoPay: "",
  pReportStatus: "U",
  pDeficiencyRemarks: "",
};

const URINALYSIS = () => {
  const [entries, setEntries] = useState([defaultEntry]);

  const handleChange = (index, field, value) => {
    const updated = [...entries];
    updated[index][field] = value;
    setEntries(updated);
  };

  const addEntry = () => {
    setEntries([...entries, { ...defaultEntry }]);
  };

  const removeEntry = (index) => {
    const updated = entries.filter((_, i) => i !== index);
    setEntries(updated);
  };

  const handleSubmit = () => {
    console.log("URINALYSIS Entries:", entries);
    // Send to API or include in final JSON payload
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        URINALYSIS
      </Typography>
      {entries.map((entry, index) => (
        <Box key={index} sx={{ mb: 4, border: "1px solid #ccc", p: 2, borderRadius: 2 }}>
          <Grid container spacing={2}>
            {Object.keys(defaultEntry).map((key) => (
              <Grid item xs={12} sm={6} md={3} key={key}>
                {["pIsApplicable", "pReportStatus"].includes(key) ? (
                  <TextField
                    select
                    fullWidth
                    label={key}
                    value={entry[key]}
                    onChange={(e) => handleChange(index, key, e.target.value)}
                  >
                    {(key === "pIsApplicable" ? ["Y", "N"] : ["U", "V", "F"]).map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : (
                  <TextField
                    fullWidth
                    label={key}
                    value={entry[key]}
                    onChange={(e) => handleChange(index, key, e.target.value)}
                  />
                )}
              </Grid>
            ))}
          </Grid>
          <Box mt={2}>
            <Button
              variant="outlined"
              color="error"
              onClick={() => removeEntry(index)}
              disabled={entries.length === 1}
            >
              Remove
            </Button>
          </Box>
        </Box>
      ))}

      <Box sx={{ mt: 2 }}>
        <Button variant="contained" onClick={addEntry} sx={{ mr: 2 }}>
          Add Another URINALYSIS
        </Button>
        <Button variant="contained" color="success" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default URINALYSIS;
