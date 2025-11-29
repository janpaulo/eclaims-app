import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  MenuItem,
  Divider,
} from "@mui/material";

const initialChestXray = {
  pHciTransNo: "",
  pReferralFacility: "",
  pLabDate: "",
  pFindings: "",
  pRemarksFindings: "",
  pObservation: "",
  pRemarksObservation: "",
  pDateAdded: "",
  pIsApplicable: "Y",
  pModule: "",
  pDiagnosticLabFee: "",
  pCoPay: "",
  pReportStatus: "U",
  pDeficiencyRemarks: "",
};

const CHESTXRAY = ({ data=[], setData }) => {
  const [entry, setEntry] = useState(initialChestXray);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEntry((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    setData((prev) => [...prev, entry]);
    setEntry(initialChestXray); // reset
  };

  return (
    <Box p={2}>
      <Typography variant="h6">Add Chest X-Ray Entry</Typography>
      <Grid container spacing={2} mt={1}>
        {Object.keys(initialChestXray).map((key) => (
          <Grid item xs={12} sm={6} md={3} key={key}>
            {key === "pIsApplicable" || key === "pReportStatus" ? (
              <TextField
                select
                fullWidth
                label={key}
                name={key}
                value={entry[key]}
                onChange={handleChange}
              >
                {key === "pIsApplicable" ? (
                  <>
                    <MenuItem value="Y">Yes</MenuItem>
                    <MenuItem value="N">No</MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem value="U">Unverified</MenuItem>
                    <MenuItem value="V">Verified</MenuItem>
                    <MenuItem value="F">Final</MenuItem>
                  </>
                )}
              </TextField>
            ) : (
              <TextField
                fullWidth
                label={key}
                name={key}
                value={entry[key]}
                onChange={handleChange}
              />
            )}
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleAdd}>
            Add Entry
          </Button>
        </Grid>
      </Grid>

      {data.length > 0 && (
        <>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6">Entries</Typography>
          {data.map((item, idx) => (
            <Box key={idx} mb={2} p={1} border="1px solid #ccc" borderRadius={2}>
              <pre>{JSON.stringify(item, null, 2)}</pre>
            </Box>
          ))}
        </>
      )}
    </Box>
  );
};

export default CHESTXRAY;
