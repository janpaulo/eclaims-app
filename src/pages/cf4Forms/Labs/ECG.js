import React from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  MenuItem,
  Typography,
  Divider,
} from "@mui/material";

const initialECG = {
  pHciTransNo: "",
  pReferralFacility: "",
  pLabDate: "",
  pFindings: "",
  pRemarks: "",
  pDateAdded: "",
  pIsApplicable: "Y",
  pModule: "",
  pDiagnosticLabFee: "",
  pCoPay: "",
  pReportStatus: "U",
  pDeficiencyRemarks: "",
};

const ECG = ({ data, setData }) => {
  const handleChange = (index, field, value) => {
    const updated = [...data];
    updated[index][field] = value;
    setData(updated);
  };

  const handleAdd = () => {
    setData([...data, { ...initialECG }]);
  };

  const handleRemove = (index) => {
    const updated = [...data];
    updated.splice(index, 1);
    setData(updated);
  };

  return (
    <Box>
      <Typography variant="h6">ECG</Typography>
      <Divider sx={{ mb: 2 }} />
      {data.map((item, index) => (
        <Box key={index} mb={3} p={2} border={1} borderRadius={2}>
          <Grid container spacing={2}>
            {Object.keys(initialECG).map((field) => (
              <Grid item xs={6} sm={4} key={field}>
                {field === "pIsApplicable" || field === "pReportStatus" ? (
                  <TextField
                    fullWidth
                    select
                    label={field}
                    value={item[field]}
                    onChange={(e) => handleChange(index, field, e.target.value)}
                  >
                    {(field === "pIsApplicable" ? ["Y", "N"] : ["U", "V", "F"]).map(
                      (val) => (
                        <MenuItem key={val} value={val}>
                          {val}
                        </MenuItem>
                      )
                    )}
                  </TextField>
                ) : (
                  <TextField
                    fullWidth
                    label={field}
                    value={item[field]}
                    onChange={(e) => handleChange(index, field, e.target.value)}
                  />
                )}
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleRemove(index)}
              >
                Remove
              </Button>
            </Grid>
          </Grid>
        </Box>
      ))}
      <Button variant="contained" onClick={handleAdd}>
        Add ECG Entry
      </Button>
    </Box>
  );
};

export default ECG;
