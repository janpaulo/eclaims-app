import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Box,
  IconButton,
  Grid,
  Button,
  Divider,MenuItem
} from "@mui/material";
import { AddCircle, RemoveCircle } from "@mui/icons-material";

const defaultEntry = {
  pMdiseaseCode: "",
  pReportStatus: "U",
  pDeficiencyRemarks: "",
};

const FAMHIST = ({ formData, setFormData }) => {
  const [entries, setEntries] = useState(
    formData.FAMHIST && formData.FAMHIST.length > 0
      ? formData.FAMHIST
      : [defaultEntry]
  );

  // Ensure formData gets initialized on first load
  useEffect(() => {
    if (!formData.FAMHIST || formData.FAMHIST.length === 0) {
      setFormData((prev) => ({ ...prev, FAMHIST: [defaultEntry] }));
    }
  }, []);

  const handleChange = (index, field, value) => {
    const updated = entries.map((entry, i) =>
      i === index ? { ...entry, [field]: value } : entry
    );
    setEntries(updated);
    setFormData((prev) => ({ ...prev, FAMHIST: updated }));
  };

  const addEntry = () => {
    const updated = [...entries, { ...defaultEntry }];
    setEntries(updated);
    setFormData((prev) => ({ ...prev, FAMHIST: updated }));
  };

  const removeEntry = (index) => {
    const updated = entries.filter((_, i) => i !== index);
    setEntries(updated);
    setFormData((prev) => ({ ...prev, FAMHIST: updated }));
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography variant="h6"> Family Medical History</Typography>
        <Button
          variant="contained"
          onClick={addEntry}
          startIcon={<AddCircle />}
        >
          Add Family History
        </Button>
      </Box>
      {/* Divider with spacing */}
      <Divider sx={{ mb: 2 }} />
      {entries.map((entry, index) => (
        <Grid container spacing={2} key={index} alignItems="center">
          <Grid item xs={3}>
            <TextField
              label="Disease Code"
              fullWidth
              value={entry.pMdiseaseCode}
              onChange={(e) =>
                handleChange(index, "pMdiseaseCode", e.target.value)
              }
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
                name="pReportStatus"
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
          <Grid item xs={6}>
            <TextField
              label="Deficiency Remarks"
              fullWidth
              value={entry.pDeficiencyRemarks}
              onChange={(e) =>
                handleChange(index, "pDeficiencyRemarks", e.target.value)
              }
            />
          </Grid>
          <Grid item xs={1}>
            <Button
              onClick={() => removeEntry(index)}
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

export default FAMHIST;
