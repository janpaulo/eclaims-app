import React, { useEffect } from "react";
import {
  Typography,
  TextField,
  Box,
  Grid,
  Button,
  MenuItem,
  Divider,
} from "@mui/material";

const FHSPECIFIC = ({ formData, setFormData }) => {
  // Add initial entry if none exist
  useEffect(() => {
    if (!formData.FHSPECIFIC || formData.FHSPECIFIC.length === 0) {
      setFormData({
        ...formData,
        FHSPECIFIC: [
          {
            pMdiseaseCode: "",
            pSpecificDesc: "",
            pReportStatus: "U",
            pDeficiencyRemarks: "",
          },
        ],
      });
    }
  }, [formData, setFormData]);

  const handleChange = (index, field, value) => {
    const updated = [...(formData.FHSPECIFIC || [])];
    updated[index][field] = value;
    setFormData({ ...formData, FHSPECIFIC: updated });
  };

  const handleAdd = () => {
    const updated = [...(formData.FHSPECIFIC || [])];
    updated.push({
      pMdiseaseCode: "",
      pSpecificDesc: "",
      pReportStatus: "U",
      pDeficiencyRemarks: "",
    });
    setFormData({ ...formData, FHSPECIFIC: updated });
  };

  const handleRemove = (index) => {
    const updated = [...(formData.FHSPECIFIC || [])];
    updated.splice(index, 1);
    setFormData({ ...formData, FHSPECIFIC: updated });
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography variant="h6">
          Specific Disease Description in Patient Family Medical History
        </Typography>
        <Button variant="contained" onClick={handleAdd}>
          Add FHSPECIFIC Entry
        </Button>
      </Box>
      {/* Divider with spacing */}
      <Divider sx={{ mb: 2 }} />
      {(formData.FHSPECIFIC || []).map((entry, index) => (
        <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Disease Code"
              fullWidth
              value={entry.pMdiseaseCode}
              onChange={(e) =>
                handleChange(index, "pMdiseaseCode", e.target.value)
              }
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Specific Description"
              fullWidth
              value={entry.pSpecificDesc}
              onChange={(e) =>
                handleChange(index, "pSpecificDesc", e.target.value)
              }
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              label="Report Status"
              select
              fullWidth
              value={entry.pReportStatus}
              onChange={(e) =>
                handleChange(index, "pReportStatus", e.target.value)
              }
            >
              <MenuItem value="U">Unvalidated</MenuItem>
              <MenuItem value="V">Validated</MenuItem>
              <MenuItem value="F">Failed</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Deficiency Remarks"
              fullWidth
              value={entry.pDeficiencyRemarks}
              onChange={(e) =>
                handleChange(index, "pDeficiencyRemarks", e.target.value)
              }
            />
          </Grid>
          <Grid item xs={12} sm={1}>
            <Button
              onClick={() => handleRemove(index)}
              color="error"
              variant="outlined"
            >
              Remove
            </Button>
          </Grid>
        </Grid>
      ))}
    </Box>
  );
};

export default FHSPECIFIC;
