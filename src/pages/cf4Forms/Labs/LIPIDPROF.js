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

const initialLipidProf = {
  pHciTransNo: "",
  pReferralFacility: "",
  pLabDate: "",
  pLdl: "",
  pHdl: "",
  pTotal: "",
  pCholesterol: "",
  pTriglycerides: "",
  pDateAdded: "",
  pIsApplicable: "Y",
  pModule: "",
  pDiagnosticLabFee: "",
  pCoPay: "",
  pReportStatus: "U",
  pDeficiencyRemarks: "",
};

const statusOptions = ["U", "V", "F"];
const applicableOptions = ["Y", "N"];

const LIPIDPROF = ({ formData = {}, setFormData = () => {} }) => {
  const data = formData?.LIPIDPROF || [];
  const handleChange = (index, field, value) => {
    const updated = [...data];
    updated[index][field] = value;
    setFormData(updated);
  };

  const handleAdd = () => {
    setFormData([...data, { ...initialLipidProf }]);
  };

  const handleRemove = (index) => {
    const updated = [...data];
    updated.splice(index, 1);
    setFormData(updated);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        LIPID PROFILE
      </Typography>
      <Divider sx={{ mb: 2 }} />
      {data.map((item, index) => (
        <Box key={index} mb={3} p={2} border={1} borderRadius={2}>
          <Grid container spacing={2}>
            {Object.entries(initialLipidProf).map(([field, _]) => (
              <Grid item xs={6} sm={4} key={field}>
                {["pIsApplicable", "pReportStatus"].includes(field) ? (
                  <TextField
                    fullWidth
                    select
                    label={field}
                    value={item?.[field] || ""}
                    onChange={(e) => handleChange(index, field, e.target.value)}
                  >
                    {(field === "pIsApplicable" ? applicableOptions : statusOptions).map((val) => (
                      <MenuItem key={val} value={val}>
                        {val}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : (
                  <TextField
                    fullWidth
                    type={["pLabDate", "pDateAdded"].includes(field) ? "date" : "text"}
                    label={field}
                    InputLabelProps={
                      ["pLabDate", "pDateAdded"].includes(field)
                        ? { shrink: true }
                        : undefined
                    }
                    value={item?.[field] || ""}
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
                Remove Entry
              </Button>
            </Grid>
          </Grid>
        </Box>
      ))}
      <Button variant="contained" onClick={handleAdd}>
        Add LIPIDPROF Entry
      </Button>
    </Box>
  );
};

export default LIPIDPROF;
